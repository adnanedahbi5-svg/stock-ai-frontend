<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useActivityLogStore } from "@/stores/activityLogStore";
import { storeToRefs } from "pinia";
import moment from "moment";

const activityLogStore = useActivityLogStore();
const { logs, loading, meta } = storeToRefs(activityLogStore);

const fetchLogs = (page = 1) => {
    activityLogStore.fetchLogs(page);
};

onMounted(() => {
    fetchLogs();
});

const goToPage = (page: number) => {
    const lastPage = Number(meta.value.last_page);
    if (page >= 1 && page <= lastPage) fetchLogs(page);
};

const totalPages = computed(() => {
    const pages: number[] = [];
    const lastPage = Number(meta.value.last_page);
    for (let i = 1; i <= lastPage; i++) pages.push(i);
    return pages;
});

const getRoleBadgeClass = (role: string) => {
    switch (role?.toLowerCase()) {
        case 'administrateur': return 'badge-danger';
        case 'gestionnaire':   return 'badge-primary';
        default:               return 'badge-secondary';
    }
};
</script>

<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">System</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Activity Logs</a></li>
      </ol>
    </div>

    <div class="row">
      <div class="col-xl-12">
        <div class="filter cm-content-box box-primary">
          <div class="content-title SlideToolHeader">
            <div class="cpa"><i class="fa-solid fa-clock-rotate-left me-2"></i>Activity History</div>
            <div class="tools">
              <a href="javascript:void(0);" class="expand SlideToolHeader"
                data-bs-toggle="collapse" data-bs-target="#logTableCollapse"
                aria-expanded="true" aria-controls="logTableCollapse">
                <i class="fal fa-angle-down"></i>
              </a>
            </div>
          </div>

          <div class="cm-content-body form excerpt collapse show" id="logTableCollapse">
            <div class="card-body pb-4">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>User</th>
                      <th>Role</th>
                      <th>Action</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="loading">
                      <td colspan="5" class="text-center py-4">
                        <i class="fas fa-spinner fa-spin me-2"></i>Loading logs...
                      </td>
                    </tr>
                    <tr v-else-if="logs.length === 0">
                      <td colspan="5" class="text-center py-4">No activity logs found.</td>
                    </tr>
                    <tr v-else v-for="(log, index) in logs" :key="log.id">
                      <td>{{ (meta.current_page - 1) * meta.per_page + index + 1 }}</td>
                      <td>
                        <span class="font-w600">{{ log.user?.name || 'Unknown' }}</span>
                      </td>
                      <td>
                        <span :class="`badge ${getRoleBadgeClass(log.user?.role)} light`">
                          {{ log.user?.role || '-' }}
                        </span>
                      </td>
                      <td>
                        <span class="text-primary">{{ log.action }}</span>
                      </td>
                      <td>{{ moment(log.dateHeure).format('DD MMM YYYY, HH:mm') }}</td>
                    </tr>
                  </tbody>
                </table>

                <!-- Pagination -->
                <div class="d-flex align-items-center justify-content-between flex-wrap mt-3">
                  <div class="dataTables_info">
                    {{ meta.total === 0 ? 0 : (meta.current_page - 1) * meta.per_page + 1 }} -
                    {{ Math.min(meta.current_page * meta.per_page, meta.total) }}
                    sur {{ meta.total }}
                  </div>

                  <div class="dataTables_paginate paging_simple_numbers">
                    <a class="paginate_button previous"
                       :class="{ disabled: meta.current_page <= 1 }"
                       @click="goToPage(meta.current_page - 1)">
                      <i class="fa fa-angle-double-left"></i>
                    </a>
                    <span>
                      <a v-for="page in totalPages" :key="page"
                         class="paginate_button m-1 border-0 text-center"
                         :class="{ current: meta.current_page === page }"
                         @click="goToPage(page)">
                        {{ page }}
                      </a>
                    </span>
                    <!-- ✅ was meta.last_page — must be meta.last_page from storeToRefs -->
                    <a class="paginate_button next"
                       :class="{ disabled: meta.current_page >= meta.last_page }"
                       @click="goToPage(meta.current_page + 1)">
                      <i class="fa fa-angle-double-right"></i>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cm-content-box table thead tr th::after {
  display: none !important;
}

.dataTables_paginate {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
}

.dataTables_paginate span {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
}

.paginate_button {
    cursor: pointer;
    min-width: 38px;
    height: 38px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px !important;
    transition: all 0.25s ease;
    border: 1px solid transparent;
    white-space: nowrap;
}

.paginate_button:hover:not(.disabled) {
    background: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
}

.paginate_button.current {
    background: var(--primary) !important;
    color: #fff !important;
}

.paginate_button.disabled {
    opacity: 0.5;
    pointer-events: none;
}

@media (max-width: 768px) {
    .dataTables_info {
        width: 100%;
        text-align: center;
        margin-bottom: 15px;
    }

    .dataTables_paginate {
        width: 100%;
    }

    .paginate_button {
        min-width: 34px;
        height: 34px;
        font-size: 13px;
    }
}
</style>