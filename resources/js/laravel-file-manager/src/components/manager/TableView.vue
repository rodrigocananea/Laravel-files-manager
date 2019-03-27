<template>
    <div class="fm-table">
        <table class="table table-sm">
            <thead>
                <tr>
                    <th class="w-65" v-on:click="sortBy('name')">
                        {{ lang.manager.table.name }}
                        <template v-if="sortSettings.field === 'name'">
                            <i class="fas fa-sort-amount-down"
                               v-show="sortSettings.direction === 'down'"></i>
                            <i class="fas fa-sort-amount-up"
                               v-show="sortSettings.direction === 'up'"></i>
                        </template>
                    </th>
                    <th class="w-10" v-on:click="sortBy('size')">
                        {{ lang.manager.table.size }}
                        <template v-if="sortSettings.field === 'size'">
                            <i class="fas fa-sort-amount-down"
                               v-show="sortSettings.direction === 'down'"></i>
                            <i class="fas fa-sort-amount-up"
                               v-show="sortSettings.direction === 'up'"></i>
                        </template>
                    </th>
                    <th class="w-10" v-on:click="sortBy('type')">
                        {{ lang.manager.table.type }}
                        <template v-if="sortSettings.field === 'type'">
                            <i class="fas fa-sort-amount-down"
                               v-show="sortSettings.direction === 'down'"></i>
                            <i class="fas fa-sort-amount-up"
                               v-show="sortSettings.direction === 'up'"></i>
                        </template>
                    </th>
                    <th>
                        <span>Link <i class="fas fa-file-download"></i></span>
                    </th>
                    <th v-on:click="sortBy('date')">
                        {{ lang.manager.table.date }}
                        <template v-if="sortSettings.field === 'date'">
                            <i class="fas fa-sort-amount-down"
                               v-show="sortSettings.direction === 'down'"></i>
                            <i class="fas fa-sort-amount-up"
                               v-show="sortSettings.direction === 'up'"></i>
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="4" class="fm-content-item" v-on:click="levelUp">
                        <i class="fas fa-level-up-alt"></i>
                    </td>
                </tr>
                <tr v-for="(directory, index) in directories"
                    v-bind:key="`d-${index}`"
                    v-bind:class="{'table-info': checkSelect('directories', directory.path)}"
                    v-on:click="selectItem('directories', directory.path, $event)"
                    v-on:contextmenu.prevent="contextMenu(directory, $event)">
                    <td class="fm-content-item unselectable"
                        v-bind:class="(acl && directory.acl === 0) ? 'text-hidden' : ''"
                        v-on:dblclick="selectDirectory(directory.path)">
                        <i class="far fa-folder"></i> {{ directory.basename }}
                    </td>
                    <td></td>
                    <td>{{ lang.manager.table.folder }}</td>
                    <td>-</td>
                    <td>
                        {{ timestampToDate(directory.timestamp) }}
                    </td>
                </tr>
                <tr v-for="(file, index) in files"
                    v-bind:key="`f-${index}`"
                    v-bind:class="{'table-info': checkSelect('files', file.path)}"
                    v-on:click="selectItem('files', file.path, $event)"
                    v-on:dblclick="selectAction(file.path, file.extension)"
                    v-on:contextmenu.prevent="contextMenu(file, $event)">
                    <td class="fm-content-item unselectable"
                        v-bind:class="(acl && file.acl === 0) ? 'text-hidden' : ''">
                        <i class="far"
                           v-bind:class="extensionToIcon(file.extension)"></i>
                        {{ file.filename ? file.filename : file.basename }}
                    </td>
                    <td>{{ bytesToHuman(file.size) }}</td>
                    <td>
                        {{ file.extension }}
                    </td>
                    <td>
                        <button
                            hint="Copiar"
                            v-clipboard:copy="filePath(file.path)"
                            v-clipboard:success="onCopySuccess"
                            v-clipboard:error="onCopyError"
                            class="btn btn-sm btn-primary"><i class="fas fa-copy"></i></button>
                    </td>
                    <td>
                        {{ timestampToDate(file.timestamp) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import translate from './../../mixins/translate';
import helper from './../../mixins/helper';
import managerHelper from './mixins/manager';

export default {
  name: 'table-view',
  mixins: [translate, helper, managerHelper],
  props: {
    manager: { type: String, required: true },
  },
  computed: {
    /**
     * Sort settings
     * @returns {*}
     */
    sortSettings() {
      return this.$store.state.fm[this.manager].sort;
    },
  },
  methods: {
    /**
     * Sort by field
     * @param field
     */
    sortBy(field) {
      this.$store.dispatch(`fm/${this.manager}/sortBy`, { field, direction: null });
    },
    onCopySuccess() {
        this.$snotify.success('Copiado com sucesso!', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            position: "rightTop"
        });
    },
    onCopyError() {
        this.$snotify.success('Erro ao copiar!', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            position: "rightTop"
        });
    },
    filePath(path) {
        return `${window.origin}/file-manager/download?disk=public&path=${path}`
    }
  },
};
</script>

<style lang="scss">
    .fm-table {

        thead th{
            background: white;
            position: sticky;
            top: 0;
            z-index: 10;
            cursor: pointer;
            border-top: none;

            &:hover {
                background-color: #f8f9fa;
            }

            & > i {
                padding-left: 0.5rem;
            }
        }

        td {
            white-space: nowrap;
            overflow: hidden;
        }

        tr:hover {
            background-color: #f8f9fa;
        }

        .w-10 {
            width: 10%;
        }

        .w-65 {
            width: 65%;
        }

        .fm-content-item {
            cursor: pointer;
        }

        .text-hidden {
            color: #cdcdcd;
        }
    }
</style>
