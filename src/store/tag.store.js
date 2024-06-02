import { defineStore } from 'pinia';

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
  },
  getters: {
    getColors: (state) => state.colors,
    getTag: (state) => state.tag,
  },
});

export default useTagStore;
