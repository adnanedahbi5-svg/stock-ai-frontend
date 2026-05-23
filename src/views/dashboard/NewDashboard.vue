<template>
  <div class="dashboard-root">
    <!-- ══════════════════════════════════════════════
         GLOBAL LOADING OVERLAY
    ══════════════════════════════════════════════ -->
    <Transition name="fade">
      <div v-if="store.loading" class="loading-overlay">
        <div class="spinner"></div>
        <span>Chargement du tableau de bord…</span>
      </div>
    </Transition>

    <!-- ══════════════════════════════════════════════
         ERROR BANNER
    ══════════════════════════════════════════════ -->
    <Transition name="slide-down">
      <div v-if="store.error" class="error-banner">
        <span>⚠ {{ store.error }}</span>
        <button @click="store.fetchDashboard()">Réessayer</button>
      </div>
    </Transition>

    <!-- ══════════════════════════════════════════════
         PAGE HEADER
    ══════════════════════════════════════════════ -->
    <header class="dash-header">
      <div class="dash-header__left">
        <h1 class="dash-title">Tableau de Bord</h1>
        <p class="dash-subtitle">
          Vue d'ensemble · mis à jour {{ lastUpdated }}
        </p>
      </div>
      <button
        class="refresh-btn"
        :disabled="store.loading"
        @click="store.fetchDashboard()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        Actualiser
      </button>
    </header>

    <!-- ══════════════════════════════════════════════
         KPI CARDS
    ══════════════════════════════════════════════ -->
    <section class="kpi-grid">
      <div
        v-for="(kpi, i) in store.kpis"
        :key="i"
        class="kpi-card"
        :class="`kpi-card--${kpi.color}`"
        :style="{ animationDelay: `${i * 80}ms` }"
      >
        <div class="kpi-card__icon">
          <component :is="iconMap[kpi.icon] ?? 'span'" />
        </div>
        <div class="kpi-card__body">
          <p class="kpi-card__label">{{ kpi.label }}</p>
          <p class="kpi-card__value">
            <span v-if="kpi.prefix" class="kpi-prefix">{{ kpi.prefix }}</span>
            {{ kpi.value }}
          </p>
        </div>
        <div class="kpi-card__bg-decor" />
      </div>
    </section>

    <!-- ══════════════════════════════════════════════
         MAIN GRID — CHARTS ROW
    ══════════════════════════════════════════════ -->
    <div class="main-grid">
      <!-- Orders Line Chart -->
      <div class="card chart-card">
        <div class="card__header">
          <h3>Commandes & Revenu <span class="badge">6 derniers mois</span></h3>
        </div>
        <div class="card__body">
          <apexchart
            v-if="store.ordersChart.length"
            type="line"
            height="260"
            :series="store.ordersChartSeries"
            :options="ordersChartOptions"
          />
          <EmptyState v-else icon="📦" label="Aucune donnée de commandes" />
        </div>
      </div>

      <!-- Category Donut -->
      <div class="card chart-card chart-card--small">
        <div class="card__header">
          <h3>Répartition Catégories</h3>
        </div>
        <div class="card__body">
          <apexchart
            v-if="store.categoryDist.length"
            type="donut"
            height="260"
            :series="store.categoryChartSeries"
            :options="donutChartOptions"
          />
          <EmptyState v-else icon="🗂️" label="Aucune catégorie" />
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════
         MOVEMENTS CHART (full-width)
    ══════════════════════════════════════════════ -->
    <div class="card chart-card chart-card--full">
      <div class="card__header">
        <h3>
          Mouvements de Stock <span class="badge">14 derniers jours</span>
        </h3>
      </div>
      <div class="card__body">
        <apexchart
          v-if="store.movementsChart.length"
          type="bar"
          height="220"
          :series="store.movementsChartSeries"
          :options="movementsChartOptions"
        />
        <EmptyState v-else icon="📊" label="Aucun mouvement récent" />
      </div>
    </div>

    <!-- ══════════════════════════════════════════════
         BOTTOM GRID — TABLES & ACTIVITY
    ══════════════════════════════════════════════ -->
    <div class="bottom-grid">
      <!-- Stock Alerts Table -->
      <div class="card table-card">
        <div class="card__header">
          <h3>
            Alertes de Stock
            <span
              v-if="store.criticalAlerts.length"
              class="badge badge--danger"
            >
              {{ store.criticalAlerts.length }} critiques
            </span>
          </h3>
        </div>
        <div class="card__body p0">
          <table v-if="store.stockAlerts.length" class="data-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Catégorie</th>
                <th>Stock</th>
                <th>Seuil</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="alert in store.stockAlerts"
                :key="alert.id"
                :class="{ 'row--critical': alert.quantiteStock <= 0 }"
                style="cursor: pointer"
                @click="goToNewCommande(alert)"
              >
                <td>
                  <span class="product-name">{{ alert.nom }}</span>
                  <small class="barcode">{{ alert.codeBarre }}</small>
                </td>
                <td>{{ alert.category ?? "—" }}</td>
                <td>
                  <span
                    class="qty"
                    :class="alert.quantiteStock <= 0 ? 'qty--zero' : 'qty--low'"
                  >
                    {{ alert.quantiteStock }}
                  </span>
                </td>
                <td>{{ alert.seuilAlerte }}</td>
                <td>
                  <span
                    class="status-pill"
                    :class="
                      alert.quantiteStock <= 0 ? 'pill--red' : 'pill--orange'
                    "
                  >
                    {{ alert.quantiteStock <= 0 ? "Rupture" : "Bas" }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <EmptyState v-else icon="✅" label="Aucune alerte de stock" />
        </div>
      </div>

      <!-- Top Products -->
      <div class="card table-card">
        <div class="card__header">
          <h3>Top Produits <span class="badge">ce mois</span></h3>
        </div>
        <div class="card__body p0">
          <div v-if="store.topProducts.length" class="top-products">
            <div
              v-for="(p, i) in store.topProducts"
              :key="p.product_id"
              class="top-product-row"
            >
              <span class="rank">{{ i + 1 }}</span>
              <div class="tp-info">
                <p class="tp-name">{{ p.nom }}</p>
                <div class="tp-bar-wrap">
                  <div
                    class="tp-bar"
                    :style="{ width: barWidth(p.total_moved) + '%' }"
                  />
                </div>
              </div>
              <span class="tp-moved">{{ p.total_moved }} mvts</span>
            </div>
          </div>
          <EmptyState v-else icon="🏆" label="Aucun mouvement ce mois" />
        </div>
      </div>

      <!-- Recent Activity Feed -->
      <div class="card activity-card">
        <div class="card__header">
          <h3>Activité Récente</h3>
        </div>
        <div class="card__body activity-feed">
          <template v-if="store.recentActivity.length">
            <div
              v-for="log in store.recentActivity"
              :key="log.id"
              class="activity-item"
            >
              <div class="activity-dot" />
              <div class="activity-body">
                <p class="activity-action">{{ log.action }}</p>
                <div class="activity-meta">
                  <span v-if="log.user" class="activity-user">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
                      />
                    </svg>
                    {{ log.user.name }}
                  </span>
                  <span class="activity-time">{{
                    formatDate(log.dateHeure)
                  }}</span>
                </div>
              </div>
            </div>
          </template>
          <EmptyState v-else icon="📋" label="Aucune activité récente" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted ,onUnmounted } from "vue";
import { useDashboardStore } from "@/stores/DashboardStore";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useRouter } from "vue-router";

// ─── Tiny inline icon components ────────────────────────────────────────────

const IconBox = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
};
const IconAlert = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
};
const IconCart = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
};
const IconMoney = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
};
const IconTruck = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
};
const IconClock = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
};

// ─── Empty State component ───────────────────────────────────────────────────

const EmptyState = {
  props: ["icon", "label"],
  template: `
    <div class="empty-state">
      <span class="empty-icon">{{ icon }}</span>
      <p>{{ label }}</p>
    </div>
  `,
};

// ─── Chart base options (ApexCharts) ────────────────────────────────────────

const chartBase: ApexOptions = {
  chart: {
    toolbar: { show: false },
    fontFamily: "inherit",
    background: "transparent",
  },
  theme: { mode: "light" },
  grid: { borderColor: "#f0f0f0", strokeDashArray: 3 },
  tooltip: { theme: "light" },
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default defineComponent({
  name: "DashBoard",

  components: {
    apexchart: VueApexCharts,
    EmptyState,
  },

  setup() {
    const store = useDashboardStore();

    onMounted(() => {
      store.fetchDashboard()
      store.startPolling(60_000) // refresh every 60s
    })
    onUnmounted(() => {
      store.stopPolling()
    })
    const router = useRouter();

    const goToNewCommande = (alert: any) => {
      router.push({
        path: "/commandes/new",
        query: {
          product_id: alert.id,
          product_name: alert.nom,
          quantity: String(alert.seuilAlerte - alert.quantiteStock + 1),
          seuil: String(alert.seuilAlerte),
        },
      });
    };

    const lastUpdated = computed(() => {
      if (!store.lastFetch) return "—";
      return new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(store.lastFetch);
    });

    const maxMoved = computed(() =>
      Math.max(...store.topProducts.map((p) => p.total_moved), 1),
    );
    const barWidth = (v: number) => Math.round((v / maxMoved.value) * 100);

    const formatDate = (iso: string) =>
      new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(iso));

    // Chart options
    const ordersChartOptions = computed(
      (): ApexOptions => ({
        ...chartBase,
        chart: { ...chartBase.chart, type: "line" as const, id: "orders" },
        colors: ["#3b82f6", "#10b981"],
        stroke: { curve: "smooth" as const, width: [3, 2] },
        markers: { size: 4 },
        xaxis: { categories: store.ordersChartCategories },
        yaxis: [
          { title: { text: "Commandes" } },
          { opposite: true, title: { text: "Revenu (MAD)" } },
        ],
        legend: { position: "top" as const },
      })
    );

    const donutChartOptions = computed(
      (): ApexOptions => ({
        ...chartBase,
        chart: { ...chartBase.chart, type: "donut" as const },
        labels: store.categoryChartLabels,
        colors: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],
        legend: { position: "bottom" as const },
        plotOptions: { pie: { donut: { size: "60%" } } },
        dataLabels: { enabled: false },
      }),
    );

    const movementsChartOptions = computed(
      (): ApexOptions => ({
        ...chartBase,
        chart: { ...chartBase.chart, type: "bar" as const, stacked: false },
        colors: ["#10b981", "#ef4444"],
        plotOptions: { bar: { borderRadius: 4, columnWidth: "55%" } },
        xaxis: { categories: store.movementsChartCategories },
        legend: { position: "top" as const },
      })
    );

    const iconMap: Record<string, object> = {
      box: IconBox,
      alert: IconAlert,
      cart: IconCart,
      money: IconMoney,
      truck: IconTruck,
      clock: IconClock,
    };

    return {
      store,
      lastUpdated,
      barWidth,
      formatDate,
      iconMap,
      ordersChartOptions,
      donutChartOptions,
      movementsChartOptions,
      goToNewCommande,
    };
  },
});
</script>

<style scoped>
/* ═══════════════════════════════════════════════════
   Design tokens
═══════════════════════════════════════════════════ */
.dashboard-root {
  --clr-bg-start: #f8fafc;
  --clr-bg-end: #eff6ff;
  --clr-surface: rgba(255, 255, 255, 0.75);
  --clr-border: rgba(255, 255, 255, 0.5);
  --clr-text: #0f172a;
  --clr-muted: #64748b;
  --clr-blue: #3b82f6;
  --clr-green: #10b981;
  --clr-red: #f43f5e;
  --clr-orange: #f59e0b;
  --clr-purple: #8b5cf6;
  --clr-yellow: #eab308;
  --radius: 20px;
  --shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  --shadow-hover: 0 20px 50px rgba(59, 130, 246, 0.08);
  --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  font-family: "Inter", "Outfit", "Segoe UI", system-ui, sans-serif;
  background: linear-gradient(
    135deg,
    var(--clr-bg-start) 0%,
    var(--clr-bg-end) 100%
  );
  min-height: 100vh;
  padding: 32px 40px;
  color: var(--clr-text);
  box-sizing: border-box;
}

/* ═══════════════════════════════════════════════════
   Loading / Error
═══════════════════════════════════════════════════ */
.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: rgba(244, 246, 251, 0.85);
  z-index: 999;
  font-size: 0.95rem;
  color: var(--clr-muted);
  backdrop-filter: blur(4px);
}
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--clr-border);
  border-top-color: var(--clr-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius);
  padding: 12px 18px;
  margin-bottom: 20px;
  color: var(--clr-red);
  font-size: 0.9rem;
}
.error-banner button {
  background: var(--clr-red);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: opacity var(--transition);
}
.error-banner button:hover {
  opacity: 0.85;
}

/* ═══════════════════════════════════════════════════
   Header
═══════════════════════════════════════════════════ */
.dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.dash-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.3px;
}
.dash-subtitle {
  margin: 4px 0 0;
  font-size: 0.83rem;
  color: var(--clr-muted);
}
.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 10px 18px;
  font-size: 0.88rem;
  cursor: pointer;
  color: var(--clr-text);
  font-weight: 600;
  transition: all var(--transition);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
}
.refresh-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.12);
  border-color: #fff;
}
.refresh-btn:active {
  transform: translateY(0);
}
.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* ═══════════════════════════════════════════════════
   KPI Grid
═══════════════════════════════════════════════════ */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.kpi-card {
  position: relative;
  overflow: hidden;
  background: var(--clr-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: var(--radius);
  padding: 24px 20px;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 16px;
  animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
  transition:
    transform var(--transition),
    box-shadow var(--transition);
}
.kpi-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-hover);
  border-color: rgba(255, 255, 255, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.kpi-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
}
.kpi-card__label {
  font-size: 0.78rem;
  color: var(--clr-muted);
  margin: 0 0 4px;
}
.kpi-card__value {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
}
.kpi-prefix {
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 3px;
}

.kpi-card__bg-decor {
  position: absolute;
  right: -20px;
  bottom: -20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  opacity: 0.08;
  pointer-events: none;
}

/* Color variants */
.kpi-card--blue {
  border-left: 4px solid var(--clr-blue);
}
.kpi-card--blue .kpi-card__icon {
  background: #eff6ff;
  color: var(--clr-blue);
}
.kpi-card--blue .kpi-card__bg-decor {
  background: var(--clr-blue);
}

.kpi-card--red {
  border-left: 4px solid var(--clr-red);
}
.kpi-card--red .kpi-card__icon {
  background: #fef2f2;
  color: var(--clr-red);
}
.kpi-card--red .kpi-card__bg-decor {
  background: var(--clr-red);
}

.kpi-card--green {
  border-left: 4px solid var(--clr-green);
}
.kpi-card--green .kpi-card__icon {
  background: #f0fdf4;
  color: var(--clr-green);
}
.kpi-card--green .kpi-card__bg-decor {
  background: var(--clr-green);
}

.kpi-card--purple {
  border-left: 4px solid var(--clr-purple);
}
.kpi-card--purple .kpi-card__icon {
  background: #faf5ff;
  color: var(--clr-purple);
}
.kpi-card--purple .kpi-card__bg-decor {
  background: var(--clr-purple);
}

.kpi-card--orange {
  border-left: 4px solid var(--clr-orange);
}
.kpi-card--orange .kpi-card__icon {
  background: #fffbeb;
  color: var(--clr-orange);
}
.kpi-card--orange .kpi-card__bg-decor {
  background: var(--clr-orange);
}

.kpi-card--yellow {
  border-left: 4px solid var(--clr-yellow);
}
.kpi-card--yellow .kpi-card__icon {
  background: #fefce8;
  color: var(--clr-yellow);
}
.kpi-card--yellow .kpi-card__bg-decor {
  background: var(--clr-yellow);
}

/* ═══════════════════════════════════════════════════
   Cards
═══════════════════════════════════════════════════ */
.card {
  background: var(--clr-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition:
    box-shadow var(--transition),
    transform var(--transition);
}
.card:hover {
  box-shadow: var(--shadow-hover);
}
.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px 0;
}
.card__header h3 {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}
.card__body {
  padding: 16px 20px;
}
.card__body.p0 {
  padding: 0;
}

/* ═══════════════════════════════════════════════════
   Main Grid (charts row)
═══════════════════════════════════════════════════ */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  margin-bottom: 20px;
}
.chart-card {
}
.chart-card--small {
}
.chart-card--full {
  margin-bottom: 20px;
}

/* ═══════════════════════════════════════════════════
   Bottom Grid
═══════════════════════════════════════════════════ */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

/* ═══════════════════════════════════════════════════
   Badge
═══════════════════════════════════════════════════ */
.badge {
  display: inline-block;
  background: #f1f5f9;
  color: var(--clr-muted);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 20px;
}
.badge--danger {
  background: #fef2f2;
  color: var(--clr-red);
}

/* ═══════════════════════════════════════════════════
   Data Table
═══════════════════════════════════════════════════ */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.data-table thead {
  background: rgba(248, 250, 252, 0.4);
}
.data-table th {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.78rem;
  color: var(--clr-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--clr-border);
}
.data-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--clr-border);
  vertical-align: middle;
}
.data-table tbody tr:last-child td {
  border-bottom: none;
}
.data-table tbody tr {
  transition: background var(--transition);
}
.data-table tbody tr:hover {
  background: rgba(241, 245, 249, 0.4);
}
.data-table tbody tr.row--critical {
  background: rgba(254, 242, 242, 0.5);
}

.product-name {
  display: block;
  font-weight: 500;
}
.barcode {
  color: var(--clr-muted);
  font-size: 0.75rem;
}

.qty {
  font-weight: 700;
}
.qty--zero {
  color: var(--clr-red);
}
.qty--low {
  color: var(--clr-orange);
}

.status-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}
.pill--red {
  background: #fef2f2;
  color: var(--clr-red);
}
.pill--orange {
  background: #fffbeb;
  color: var(--clr-orange);
}
.pill--green {
  background: #f0fdf4;
  color: var(--clr-green);
}

/* ═══════════════════════════════════════════════════
   Top Products
═══════════════════════════════════════════════════ */
.top-products {
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.top-product-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rank {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(241, 245, 249, 0.6);
  color: var(--clr-blue);
  font-size: 0.82rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}
.tp-info {
  flex: 1;
  min-width: 0;
}
.tp-name {
  font-size: 0.88rem;
  font-weight: 500;
  margin: 0 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tp-bar-wrap {
  height: 6px;
  background: rgba(241, 245, 249, 0.6);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}
.tp-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--clr-blue), var(--clr-purple));
  border-radius: 3px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.tp-moved {
  font-size: 0.8rem;
  color: var(--clr-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════════════
   Activity Feed
═══════════════════════════════════════════════════ */
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: 360px;
  overflow-y: auto;
  padding: 12px 20px;
}
.activity-item {
  display: flex;
  gap: 14px;
  padding: 12px 10px;
  border-bottom: 1px solid var(--clr-border);
  transition:
    background var(--transition),
    transform var(--transition);
  border-radius: 8px;
}
.activity-item:hover {
  background: rgba(248, 250, 252, 0.4);
  transform: translateX(4px);
}
.activity-item:last-child {
  border-bottom: none;
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--clr-blue);
  margin-top: 6px;
  flex-shrink: 0;
}
.activity-action {
  margin: 0 0 4px;
  font-size: 0.87rem;
  font-weight: 500;
  line-height: 1.35;
}
.activity-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}
.activity-user {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--clr-muted);
}
.activity-time {
  font-size: 0.75rem;
  color: var(--clr-muted);
}

/* ═══════════════════════════════════════════════════
   Empty State
═══════════════════════════════════════════════════ */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: var(--clr-muted);
  gap: 10px;
}
.empty-icon {
  font-size: 2rem;
}
.empty-state p {
  margin: 0;
  font-size: 0.88rem;
}

/* ═══════════════════════════════════════════════════
   Transitions
═══════════════════════════════════════════════════ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.25s ease;
}
.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ═══════════════════════════════════════════════════
   Responsive
═══════════════════════════════════════════════════ */
@media (max-width: 1200px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
  .bottom-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 768px) {
  .dashboard-root {
    padding: 16px;
  }
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bottom-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>
