<template>
  <table id="attendance-tbl" class="table">
    <thead>
      <tr>
        <th @click="sortingArr(1)">Employee Name</th>
        <th>
          <span>1</span>
          <p>MO</p>
        </th>
        <th>
          <span>2</span>
          <p>Tu</p>
        </th>
        <th>
          <span>3</span>
          <p>We</p>
        </th>
        <th>
          <span>4</span>
          <p>Th</p>
        </th>
        <th>
          <span>5</span>
          <p>Fr</p>
        </th>
        <th>
          <span>6</span>
          <p>Sa</p>
        </th>
        <th>
          <span>7</span>
          <p>MO</p>
        </th>
        <th>
          <span>8</span>
          <p>Tu</p>
        </th>
        <th>
          <span>9</span>
          <p>We</p>
        </th>
        <th>
          <span>10</span>
          <p>Th</p>
        </th>
        <th>
          <span>11</span>
          <p>Fr</p>
        </th>
        <th>
          <span>12</span>
          <p>Sa</p>
        </th>
        <th>
          <span>13</span>
          <p>MO</p>
        </th>
        <th>
          <span>14</span>
          <p>Tu</p>
        </th>
        <th>
          <span>15</span>
          <p>We</p>
        </th>
        <th>
          <span>16</span>
          <p>Th</p>
        </th>
        <th>
          <span>17</span>
          <p>Fr</p>
        </th>
        <th>
          <span>18</span>
          <p>Sa</p>
        </th>
        <th>
          <span>19</span>
          <p>MO</p>
        </th>
        <th>
          <span>20</span>
          <p>Tu</p>
        </th>
        <th>
          <span>21</span>
          <p>We</p>
        </th>
        <th>
          <span>22</span>
          <p>Th</p>
        </th>
        <th>
          <span>23</span>
          <p>Fr</p>
        </th>
        <th>
          <span>24</span>
          <p>Sa</p>
        </th>
        <th>
          <span>25</span>
          <p>MO</p>
        </th>
        <th>
          <span>26</span>
          <p>Tu</p>
        </th>
        <th>
          <span>27</span>
          <p>We</p>
        </th>
        <th>
          <span>28</span>
          <p>Th</p>
        </th>
        <th>
          <span>29</span>
          <p>Fr</p>
        </th>
        <th>
          <span>30</span>
          <p>Sa</p>
        </th>
        <th>
          <span>31</span>
          <p>MO</p>
        </th>
        <th class="text-center">
          <span>Total</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="({ name, img }, ind) in paginatedData" :key="ind">
        <td>
          <div class="products">
            <img :src="img" class="avatar avatar-md" alt="" />
            <div>
              <h6>{{ name }}</h6>
              <span>Web Designer</span>
            </div>
          </div>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-danger"><i class="fa-regular fa-xmark"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-danger"><i class="fa-regular fa-xmark"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-danger"><i class="fa-regular fa-xmark"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-danger"><i class="fa-regular fa-xmark"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-danger"><i class="fa-regular fa-xmark"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td>
          <span class="text-success"><i class="fa-solid fa-check"></i></span>
        </td>
        <td class="text-center"><span>28/31</span></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import handlePagination from "@/layouts/HandlePaginatin";
import { defineComponent } from "vue";
import { employeeTable } from "./TableArrayData";

export default defineComponent({
  name: "coreHr_",
  setup() {
    const handlePaginationValue = handlePagination(employeeTable, 5);
    return {
      ...handlePaginationValue,
    };
  },
});
</script>

<style scoped>
.active-projects th:after {
  content: "";
  display: none;
}
</style>
