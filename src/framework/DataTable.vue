<template>
  <div class="v-table">
    <div class="v-table-header">
      <div class="v-table-header-count">
        Show
        <select v-model="dataTable.options.pageCount" @change="onChangePageCount()">
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>
        items each page
      </div>

      <div class="v-table-header-search">
        Search <input type="text" v-model="searchBy">
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="column in dataTable.columns" @click="sortBy(column)" :class="{sort: isSortable(column), 
                       desc: sort.sortBy === column.value && sort.desc,
                       asc: sort.sortBy === column.value && !sort.desc}">{{column.text}}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in filteredRows | pagination(filteredRows,currentPage ,dataTable.optionts.pageCount) " track-by="$index">
          <td v-for="(key, item) in row" @click="editField(item, key)">
            <span v-if="!item.editing">{{item.value}}</span>
            <template v-if="isEditable(item, key)">
              <input type="text" v-model="item.tmpValue">
              <button type="button" @click.stop="saveEdit(item)">Save</button>
              <button type="button" @click.stop="cancelEdit(item)">Cancel</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="v-table-footer">
      <div class="v-table-footer-info">
        Showing {{firstRow + 1}} to {{lastRow}} of {{filteredRows.length}} items
      </div>

      <div class="v-table-footer-page" v-if="lastPage !== 1">
        <a class="v-table-footer-page-btn" href="javascript:;" @click="togglePage('prev')" :class="{disabled: currentPage == 1}">Prev</a>
        <a class="v-table-footer-page-btn" href="javascript:;" :class="{current: currentPage == 1}" @click="togglePage(1)">1</a>
        <span v-if="currentPage >= 5 && lastPage > 10">...</span>
        <a class="v-table-footer-page-btn" href="javascript:;" :class="{current: currentPage == page + 1}" @click="togglePage(page + 1)" v-for="page in centerPartPage">{{page + 1}}</a>
        <span v-if="lastPage > 10 && lastPage - currentPage > 5">...</span>
        <a class="v-table-footer-page-btn" href="javascript:;" :class="{current: currentPage == page + 1}" @click="togglePage(page + 1)" v-for="page in lastPartPage">{{page + 1}}</a>
        <a class="v-table-footer-page-btn" href="javascript:;" @click="togglePage('next')" :class="{disabled: currentPage == lastPage}">Next</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataTable'],

  data() {
    return {
      currentPage: 1,
      searchBy: '',
      rows: [],
      sort: {
        sortBy: '',
        desc: true
      }
    }
  },

  computed: {
    filteredRows() {
      return this.filterRows(this.dataTable.rows, this.dataTable.options, this.currentPage);
    },

    lastPage() {
      return Math.ceil(this.filteredRows.length / this.dataTable.options.pageCount);
    },

    centerPartPage() {
      if (this.lastPage > 10 && this.currentPage >= 5) {
        if (this.lastPage - this.currentPage > 5) {
          return this.currentPage === this.lastPage ? [this.currentPage - 3, this.currentPage - 2, this.currentPage - 1] : [this.currentPage - 2, this.currentPage - 1, this.currentPage];
        } else {
          const r = [];

          for (let i = this.lastPage - 6; i < this.lastPage; i++) {
            r.push(i);
          }
          return r;
        }
      } else if (this.lastPage > 10) {
        const r = [];

        for (let i = 1; i < 5; i++) {
          r.push(i);
        }
        return r;
      } else {
        const r = [];

        for (let i = 1; i < this.lastPage; i++) {
          r.push(i);
        }
        return r;
      }
    },

    lastPartPage() {
      if (this.lastPage > 10 && this.lastPage - this.currentPage > 5) {
        return [this.lastPage - 1];
      } else {
        return [];
      }
    },

    firstRow() {
      return this.currentPage === 1 ? 0 : this.dataTable.options.pageCount * (this.currentPage - 1);
    },

    lastRow() {
      return this.dataTable.options.pageCount * this.currentPage > this.filteredRows.length ? this.filteredRows.length : this.dataTable.options.pageCount * this.currentPage;
    }
  },

  watch: {
    'dataTable.rows'(rows) {
      rows.forEach((row, index) => {
        for (let key in row) {
          const column = this.dataTable.columns.filter((column) => {
            return column.value === key;
          })[0];

          row[key] = Object.assign({
            editable: column.editable,
            editing: false,
            tmpValue: ''
          }, row[key]);
        }

        this.dataTable.rows[index] = row;
      });
    },

    'dataTable.columns'(columns) {
      columns.forEach((column, index) => {
        column = Object.assign({
          editable: false,
          sortable: false
        }, column);

        this.dataTable.columns[index] = column;
      })
    },

    'searchBy'(val) {
      console.log(val);
      if (val) {
        this.currentPage = 1;
      }
    }
  },

  filters: {
    pagination(rows, currentPage, pageCount) {
      return this.getPageRows(rows, currentPage, pageCount);
    }
  },

  methods: {
    onChangePageCount() {
      this.currentPage = 1;
    },

    filterRows(rows, options, currentPage) {
      rows = this.sort.sortBy ? this.sortRows(rows, this.sort.sortBy) : rows;

      if (this.searchBy !== '') {
        rows = rows.filter((row) => {
          let r = false;

          for (let key in row) {
            if (row[key].value
              .toString()
              .toLowerCase()
              .indexOf(this.searchBy.toLowerCase()) !== -1) {
              r = true;
            }
          }

          return r;
        });
      }

      return rows;
    },

    getPageRows(rows) {
      return rows.slice(this.firstRow, this.lastRow);
    },

    togglePage(page) {
      switch (page) {
        case 'prev':
          if (this.currentPage <= 1) return;
          this.currentPage--;
          break;
        case 'next':
          if (this.currentPage >= this.lastPage) return;
          this.currentPage++;
          break;
        default:
          if (this.currentPage == page) return;
          this.currentPage = page;
      }
      if (this.dataTable.onPageChanged) {
        this.dataTable.onPageChanged(this.currentPage);
      }
    },

    sortBy(column) {
      if (!column.sortable || !this.dataTable.options.sortable) return;

      if (column.value === this.sort.sortBy) {
        this.sort.desc = !this.sort.desc;
      } else {
        this.sort.sortBy = column.value;
        this.sort.desc = true;
      }
    },

    editField(field, key) {
      if (!this.isEditable(field, key, true)) return;

      field.tmpValue = field.value;
      field.editing = true;
    },

    saveEdit(field) {
      field.value = field.tmpValue;
      field.editing = false;
      field.tmpValue = '';
    },

    cancelEdit(field) {
      field.editing = false;
      field.tmpValue = '';
    },

    sortRows(rows, sortBy) {
      const arr = rows.slice(0);

      return arr.sort((a, b) => {
        const r = this.sort.desc ? a[sortBy].value < b[sortBy].value : a[sortBy].value > b[sortBy].value;

        return r ? 1 : -1;
      })
    },

    isSortable(column) {
      return column.sortable && this.dataTable.options.sortable;
    },

    isEditable(field, key, beforeEditing) {
      const column = this.dataTable.columns.filter((column) => {
        return column.value === key;
      })[0];
      if (beforeEditing) {
        return field.editable && this.dataTable.options.editable && column.editable;
      } else {
        return field.editable && this.dataTable.options.editable && field.editing && column.editable;
      }
    }
  }
}
</script>
