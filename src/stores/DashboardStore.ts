// stores/dashboard.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

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

  async function fetchDashboard(): Promise<void> {
    loading.value = true
    error.value   = null

    try {
      const { data } = await axios.get<DashboardData>('/api/dashboard')

      kpis.value           = data.kpis
      stockAlerts.value    = data.stock_alerts
      recentActivity.value = data.recent_activity
      ordersChart.value    = data.orders_chart
      movementsChart.value = data.movements_chart
      topProducts.value    = data.top_products
      categoryDist.value   = data.category_dist

      lastFetch.value = new Date()
    } catch (err: any) {
      error.value = err?.response?.data?.message ?? 'Erreur lors du chargement du tableau de bord.'
      console.error('[DashboardStore]', err)
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
    loading.value        = false
    error.value          = null
    lastFetch.value      = null
    kpis.value           = []
    stockAlerts.value    = []
    recentActivity.value = []
    ordersChart.value    = []
    movementsChart.value = []
    topProducts.value    = []
    categoryDist.value   = []
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
    $reset,
  }
})