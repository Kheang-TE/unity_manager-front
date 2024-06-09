import { defineStore } from 'pinia';
import { createTag, updateTag, deleteTag } from '@/api/tag.js';

const useTagStore = defineStore('tag', {
  state: () => ({
    colors: [
      { name: 'red', code: '#800000' },
      { name: 'yellow', code: '#FFAC26' },
      { name: 'orange', code: '#FF8000' },
      { name: 'blue', code: '#247597' },
      { name: 'green', code: '#008000' },
      { name: 'brown', code: '#804000' },
      { name: 'violet', code: '#800080' },
      { name: 'gray', code: '#808080' },
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
