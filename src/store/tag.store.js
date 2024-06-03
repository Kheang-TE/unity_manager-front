import { defineStore } from 'pinia';
import { createTag, updateTag, deleteTag } from '@/api/tag.js';

const useTagStore = defineStore('tag', {
  state: () => ({
    colors: [
      { name: 'red', code: '#ae2e25' },
      { name: 'yellow', code: '#c7ad00' },
      { name: 'orange', code: '#a54800' },
      { name: 'blue', code: '#267699' },
      { name: 'green', code: '#216e4e' },
      { name: 'brown', code: '#7f5f01' },
      { name: 'violet', code: '#5e4db2' },
      { name: 'gray', code: '#777777' },
    ],
    tag: {
      name: '',
      code_color: '',
      project_id: '',
    },
    selectedTags: [],
  }),
  actions: {
    setTagName(name) {
      this.tag.name = name;
    },
    setTagColor(color) {
      this.tag.code_color = color;
    },
    setProjectId(projectId) {
      this.tag.project_id = projectId;
    },

    setSelectedTags(tags) {
      this.selectedTags = tags;
    },

    addTag(newTag) {
      createTag(newTag);
    },

    editTag(editedTag) {
      updateTag(editedTag);
    },

    removeTag(tagId) {
      deleteTag(tagId);
    },

  },
  getters: {
    getColors: (state) => state.colors,
    getTag: (state) => state.tag,
    getSelectedTags: (state) => state.selectedTags,
  },
});

export default useTagStore;
