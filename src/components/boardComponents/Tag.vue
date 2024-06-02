<template>
  <b-button v-b-modal.container-tags>
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
                  <b-form-input v-model="tagName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="9">
                <b-form-group label="Tag Color">
                  <b-form-select v-model="tagColor">
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
              <ul>
                <li v-for="tag in tagList" :key="tag.id"></li>
              </ul>
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
import { createTag } from '@/api/tag.js';

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

  methods: {
    createTag() {
      this.tagStore.setProjectId(this.boardStore.project.id);
      const newTag = this.tagStore.getTag;
      createTag(newTag);
      document.querySelector('#container-tags form').reset();
    },

    // updateTagName() {
    //   this.tagStore.setTagName(this.tagName);
    // },

    // updateSelectColor() {
    //   this.tagStore.setTagColor(this.tagColor);
    // },

  },
};
</script>

<style scoped>
.sample {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>
