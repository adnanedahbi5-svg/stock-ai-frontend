// stores/dashboard.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
const pollingTimer = ref<ReturnType<typeof setInterval> | null>(null)
// ─── Types ────────────────────────────────────────────────────────────────────

export interface KPI {
  label: string
  value: string | number
  icon: string
  color: string
  prefix?: string
}

export interface StockAlert {
  id: number
  nom: string
  codeBarre: string
  quantiteStock: number
  seuilAlerte: number
  category: string | null
}

export interface ActivityLogEntry {
  id: number
  action: string
  dateHeure: string
  user: { id: number; name: string; role: string } | null
}

export interface OrderChartPoint {
  label: string
  total_orders: number
  total_revenue: number
}

export interface MovementChartPoint {
  day: string
  entrees: number
  sorties: number
}

export interface TopProduct {
  product_id: number
  nom: string
  quantiteStock: number
  total_moved: number
}

export interface CategoryDist {
  category: string
  count: number
}

export interface DashboardData {
  kpis: KPI[]
  stock_alerts: StockAlert[]
  recent_activity: ActivityLogEntry[]
  orders_chart: OrderChartPoint[]
  movements_chart: MovementChartPoint[]
  top_products: TopProduct[]
  category_dist: CategoryDist[]
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useDashboardStore = defineStore('dashboard', () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const loading   = ref(false)
  const error     = ref<string | null>(null)
  const lastFetch = ref<Date | null>(null)

  const kpis            = ref<KPI[]>([])
  const stockAlerts     = ref<StockAlert[]>([])
  const recentActivity  = ref<ActivityLogEntry[]>([])
  const ordersChart     = ref<OrderChartPoint[]>([])
  const movementsChart  = ref<MovementChartPoint[]>([])
  const topProducts     = ref<TopProduct[]>([])
  const categoryDist    = ref<CategoryDist[]>([])
  const recentMovements = ref<any[]>([])

  // ── Getters ────────────────────────────────────────────────────────────────

  /** Products with stock ≤ 0 (critical) */
  const criticalAlerts = computed(() =>
    stockAlerts.value.filter(p => p.quantiteStock <= 0)
  )

  /** Series for the donut / pie chart (ApexCharts format) */
  const categoryChartSeries = computed(() =>
    categoryDist.value.map(c => c.count)
  )
  const categoryChartLabels = computed(() =>
    categoryDist.value.map(c => c.category)
  )

  /** ApexCharts series for orders line chart */
  const ordersChartSeries = computed(() => [
    {
      name: 'Commandes',
      data: ordersChart.value.map(p => p.total_orders),
    },
    {
      name: 'Revenu (MAD)',
      data: ordersChart.value.map(p => p.total_revenue),
    },
  ])
  const ordersChartCategories = computed(() =>
    ordersChart.value.map(p => p.label)
  )

  /** ApexCharts series for stock movements bar chart */
  const movementsChartSeries = computed(() => [
    {
      name: 'Entrées',
      data: movementsChart.value.map(p => p.entrees),
    },
    {
      name: 'Sorties',
      data: movementsChart.value.map(p => p.sorties),
    },
  ])
  const movementsChartCategories = computed(() =>
    movementsChart.value.map(p => p.day)
  )

  // ── Actions ────────────────────────────────────────────────────────────────

  /** Fetch the latest 20 movements to show in the dashboard table */
  async function fetchRecentMovements(): Promise<void> {
    try {
      const resp = await api.get('movements', { params: { per_page: 20, page: 1 } })
      const rd = resp.data
      if (Array.isArray(rd)) {
        recentMovements.value = rd
      } else if (Array.isArray(rd?.data)) {
        recentMovements.value = rd.data
      } else if (rd?.data && Array.isArray(rd.data?.data)) {
        recentMovements.value = rd.data.data
      } else {
        recentMovements.value = []
      }
      console.log('[DashboardStore] 📋 recentMovements loaded:', recentMovements.value.length)
    } catch (e) {
      console.warn('[DashboardStore] fetchRecentMovements failed', e)
    }
  }
  function startPolling(intervalMs = 60_000): void {
    stopPolling()
    pollingTimer.value = setInterval(() => fetchDashboard(), intervalMs)
  }

  function stopPolling(): void {
    if (pollingTimer.value !== null) {
      clearInterval(pollingTimer.value)
      pollingTimer.value = null
    }
  }

  /**
   * Build a movements_chart array (last 14 days) from raw movements list
   * when the backend dashboard endpoint doesn't supply it.
   */
  async function buildMovementsChartFromRaw(): Promise<MovementChartPoint[]> {
    try {
      console.log('[DashboardStore] 🔄 Fetching raw movements from /api/movements...')
      const resp = await api.get('movements', { params: { per_page: 500, page: 1 } })
      console.log('[DashboardStore] 📦 Raw movements API response:', JSON.stringify(resp.data))

      // Handle both paginated and flat responses
      // Laravel paginator: { data: [...], meta: {...} }
      // Flat array: [...]
      let list: any[] = []
      const rd = resp.data
      if (Array.isArray(rd)) {
        list = rd
      } else if (Array.isArray(rd?.data)) {
        // Laravel Resource Collection: { data: [...], meta: {...} }
        list = rd.data
      } else if (rd?.data && Array.isArray(rd.data?.data)) {
        // Double-wrapped
        list = rd.data.data
      }

      console.log('[DashboardStore] 📋 Movements list extracted, count:', list.length)
      if (list.length > 0) {
        console.log('[DashboardStore] 🔍 First movement sample:', JSON.stringify(list[0]))
      }

      // Build a map: YYYY-MM-DD => { entrees, sorties }
      const map: Record<string, { entrees: number; sorties: number }> = {}

      // Pre-populate the last 14 days with zeros
      for (let i = 13; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const key = d.toISOString().slice(0, 10)
        map[key] = { entrees: 0, sorties: 0 }
      }

      for (const mv of list) {
        // Try all possible date field names
        const dateStr: string | undefined =
          mv.dateheure ?? mv.date_heure ?? mv.dateHeure ?? mv.created_at ?? mv.date
        if (!dateStr) {
          console.warn('[DashboardStore] ⚠️ Movement has no date field:', JSON.stringify(mv))
          continue
        }
        const day = dateStr.slice(0, 10)
        if (!map[day]) {
          console.log('[DashboardStore] ⏭️ Movement date outside 14-day window:', day)
          continue
        }

        // Normalise type: "Entrée", "entree", "entrée" → entrees
        //                 "Sortie", "sortie"           → sorties
        const type: string = (mv.type ?? '').toLowerCase()
        // Remove accents: é → e, so "entrée" → "entree"
        const typeNorm = type.normalize('NFD').replace(/\p{Diacritic}/gu, '')
        const qty: number = Number(mv.quantite ?? mv.quantity ?? 0)

        console.log(`[DashboardStore] ✅ Movement: day=${day} type="${mv.type}" (norm="${typeNorm}") qty=${qty}`)

        if (typeNorm.startsWith('entr')) {
          map[day].entrees += qty
        } else if (typeNorm.startsWith('sort')) {
          map[day].sorties += qty
        } else {
          console.warn('[DashboardStore] ❓ Unknown movement type:', mv.type)
        }
      }

      const result = Object.entries(map).map(([day, v]) => ({ day, ...v }))
      console.log('[DashboardStore] 📊 Final movementsChart data:', JSON.stringify(result))
      return result
    } catch (e) {
      console.error('[DashboardStore] ❌ buildMovementsChartFromRaw failed:', e)
      return []
    }
  }

  async function fetchDashboard(): Promise<void> {
    loading.value = true
    error.value   = null

    try {
      console.log('[DashboardStore] 🚀 Fetching /api/dashboard...')
      const { data } = await api.get<DashboardData>('dashboard')
      console.log('[DashboardStore] ✅ Dashboard response received.')
      console.log('[DashboardStore] movements_chart from backend:', JSON.stringify(data.movements_chart))

      kpis.value           = data.kpis           ?? []
      stockAlerts.value    = data.stock_alerts    ?? []
      recentActivity.value = data.recent_activity ?? []
      ordersChart.value    = data.orders_chart    ?? []
      topProducts.value    = data.top_products    ?? []
      categoryDist.value   = data.category_dist   ?? []

      // Use backend movements_chart if provided and non-empty,
      // otherwise compute it ourselves from the raw movements endpoint.
      const backendMovements: MovementChartPoint[] = data.movements_chart ?? []
      if (backendMovements.length > 0) {
        console.log('[DashboardStore] 📊 Using backend movements_chart, length:', backendMovements.length)
        movementsChart.value = backendMovements
      } else {
        console.info('[DashboardStore] ⚠️ movements_chart empty from backend – falling back to raw movements')
        movementsChart.value = await buildMovementsChartFromRaw()
      }

      // Always fetch recent movements for the dashboard table
      await fetchRecentMovements()

      console.log('[DashboardStore] 📈 Final movementsChart.value length:', movementsChart.value.length)
      lastFetch.value = new Date()
    } catch (err: any) {
      console.error('[DashboardStore] ❌ fetchDashboard error:', err)
      // If the main dashboard call fails entirely, still try to load movements
      console.info('[DashboardStore] 🔄 Dashboard failed – trying to build movements chart from raw...')
      movementsChart.value = await buildMovementsChartFromRaw()
      await fetchRecentMovements()
      error.value = err?.response?.data?.message ?? 'Erreur lors du chargement du tableau de bord.'
    } finally {
      loading.value = false
    }
  }

  /** Call fetchDashboard only if data is older than `maxAgeMs` (default 2 min) */
  async function fetchIfStale(maxAgeMs = 2 * 60 * 1000): Promise<void> {
    if (
      !lastFetch.value ||
      Date.now() - lastFetch.value.getTime() > maxAgeMs
    ) {
      await fetchDashboard()
    }
  }

  function $reset(): void {
    loading.value         = false
    error.value           = null
    lastFetch.value       = null
    kpis.value            = []
    stockAlerts.value     = []
    recentActivity.value  = []
    ordersChart.value     = []
    movementsChart.value  = []
    topProducts.value     = []
    categoryDist.value    = []
    recentMovements.value = []
  }

  return {
    // state
    loading,
    error,
    lastFetch,
    kpis,
    stockAlerts,
    recentActivity,
    ordersChart,
    movementsChart,
    topProducts,
    categoryDist,
    recentMovements,
    // getters
    criticalAlerts,
    categoryChartSeries,
    categoryChartLabels,
    ordersChartSeries,
    ordersChartCategories,
    movementsChartSeries,
    movementsChartCategories,
    // actions
    fetchDashboard,
    fetchIfStale,
    fetchRecentMovements,
    $reset,
    startPolling,
    stopPolling,
  }
})