<template>
  <b-button v-b-modal.container-tags v-if="boardStore.project.tags">
    <font-awesome-icon :icon="['fas', 'tag']" />
  </b-button>
  <b-modal id="container-tags" title="Tags" size="lg" centered hide-footer="true">
    <b-accordion>

      <!-- Create a new tag -->
      <b-accordion-item title="Create a new tag" visible>
        <b-form>
          <b-container>
            <b-row>
              <b-col>
                <b-form-group label="Tag Name">
                  <b-form-input v-model="tagName" @change="updateTagName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="9">
                <b-form-group label="Tag Color">
                  <b-form-select v-model="tagColor" @change="updateSelectColor">
                    <b-form-select-option :value="null">-- Select a color --</b-form-select-option>
                    <b-form-select-option v-for="color in tagStore.getColors" :key="color.name" :value="color.code">
                      {{ color.name }}
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="d-flex justify-content-end align-items-end">
                <b-button @click="createTag">Create</b-button>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </b-accordion-item>
      <!-- Create a new tag - End -->

      <!-- List of tags -->
      <b-accordion-item title="List of tags">
        <b-container>
          <b-row>
            <b-col>
              <b-table striped hover :items="tagList" :fields="fieldsTag" id="tag-table">
                <!-- Tag color -->
                <template #cell(color)="data">
                  <span class="tag-color" :style="{ backgroundColor: data.item.code_color }"></span>
                </template>
                <!-- Tag color - End -->

                <!-- Action -->
                <template #cell(action)="data">
                  <!-- Edit the tag -->
                  <b-button v-b-modal="'edit-tag-' + data.item.id" class="project-control-edit">
                    <font-awesome-icon :icon="['far', 'pen-to-square']" />
                  </b-button>
                  <b-modal :id="'edit-tag-' + data.item.id" title="Edit the tag" centered @ok="updateTag(data.item)">
                    <b-container>
                      <b-row>
                        <b-col>
                          <b-form-group label="Tag Name">
                            <b-form-input v-model="data.item.name"></b-form-input>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="9">
                          <b-form-group label="Tag Color">
                            <b-form-select v-model="data.item.code_color">
                              <b-form-select-option v-for="color in tagStore.getColors" :key="color.name"
                                :value="color.code">
                                {{ color.name }}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-modal>

                  <!-- Delete the tag -->
                  <b-button v-b-modal="'delete-tag-' + data.item.id">
                    <font-awesome-icon :icon="['far', 'trash-can']" />
                  </b-button>
                  <b-modal :id="'delete-tag-' + data.item.id" centered @ok="deleteTag(data.item.id)">
                    <template #title>
                      Delete the tag : {{ data.item.name }}
                    </template>
                    <p>Are you sure you want to delete this project ?</p>
                  </b-modal>
                </template>
                <!-- Action - End -->

              </b-table>
            </b-col>
          </b-row>
        </b-container>
      </b-accordion-item>
      <!-- List of tags - End -->
    </b-accordion>
  </b-modal>
</template>

<script>
import { ref, computed } from 'vue';
import useBoardStore from '@/store/board.store';
import useTagStore from '@/store/tag.store.js';

export default {
  name: 'Tag',

  setup() {
    const boardStore = useBoardStore();
    const tagStore = useTagStore();
    const tagName = ref(tagStore.tag.name);
    const tagColor = ref(tagStore.tag.code_color);

    const tagList = computed(() => boardStore.tags);

    return {
      boardStore,
      tagStore,
      tagName,
      tagColor,
      tagList,
    };
  },

  data() {
    return {
      fieldsTag: [
        { key: 'color', label: 'Color', class: 'cell-color' },
        'name',
        { key: 'action', label: 'Action', class: 'cell-action' },
      ],
    };
  },

  methods: {
    createTag() {
      this.tagStore.setProjectId(this.boardStore.project.id);
      const newTag = this.tagStore.getTag;
      this.tagStore.addTag(newTag);
      document.querySelector('#container-tags form').reset();
    },

    updateTagName() {
      this.tagStore.setTagName(this.tagName);
    },

    updateSelectColor() {
      this.tagStore.setTagColor(this.tagColor);
    },

    updateTag(editedTag) {
      this.tagStore.editTag(editedTag);
    },

    deleteTag(tagId) {
      this.tagStore.removeTag(tagId);
    },

  },
};
</script>

<style>
.cell-color {
  width: 20%;
}

.cell-action {
  width: 20%;
}

#tag-table button {
  margin-right: .5rem;
}

#tag-table button:last-child {
  margin-right: 0;
}

.tag-color {
  display: block;
  width: 100%;
  height: 38px;
}
</style>
