<template v-if="boardStore.selectedProject">
  <div v-for="list in boardStore.selectedProject.lists" class="list">
    <div class="list-header">
      <h2>{{ list.name }}</h2>
      <div class="list-controls">
        <b-dropdown no-caret>
          <template #button-content>
            <font-awesome-icon :icon="['fas', 'ellipsis']" />
          </template>
          <b-dropdown-item>
            <b-link v-b-modal="'add-card-list-' + list.id">Add new card</b-link>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'edit-list-' + list.id">Edit</b-link>
            <b-modal :id="'edit-list-' + list.id" centered>
              <template #title>
                Edit list : {{ list.name }}
              </template>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-list-' + list.id">Delete</b-link>
            <b-modal :id="'delete-list-' + list.id" centered>
              <template #title>
                Delete list : {{ list.name }}
              </template>
              <p>Are you sure you want to delete this list ?</p>
            </b-modal>
          </b-dropdown-item>
        </b-dropdown>
        <b-button v-b-toggle="list.id" variant="none">
          <font-awesome-icon :icon="['fas', 'angle-up']" />
        </b-button>
      </div>
    </div>

    <b-collapse :id="list.id" class="list-body" visible>
      <b-card v-for="card in list.cards">
        <div class="card-header">
          <h5>{{ card.name }}</h5>
          <div class="card-controls">
            <b-dropdown no-caret>
              <template #button-content>
                <font-awesome-icon :icon="['fas', 'ellipsis']" />
              </template>
              <b-dropdown-item>
                <b-link v-b-modal="'edit-card-' + card.id">Edit</b-link>
                <b-modal :id="'edit-card-' + card.id" centered>
                  <template #title>
                    Edit card : {{ card.name }}
                  </template>
                </b-modal>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-link v-b-modal="'delete-card-' + card.id">Delete</b-link>
                <b-modal :id="'delete-card-' + card.id" centered>
                  <template #title>
                    Delete card : {{ card.name }}
                  </template>
                  <p>Are you sure you want to delete this card ?</p>
                </b-modal>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <p>{{ card.description }}</p>
      </b-card>

      <b-button class="add-card" v-b-modal="'add-card-list-' + list.id">[+] Add new card</b-button>
      <b-modal :id="'add-card-list-' + list.id" title="Add new card to list" centered>
      </b-modal>
    </b-collapse>
  </div>

  <!-- Add new list -->
  <b-button class="new-list" v-b-modal.add-new-list>
    <font-awesome-icon :icon="['fas', 'plus']" />[ Add new list ]
  </b-button>
  <b-modal id="add-new-list" title="Add new list" centered >

  </b-modal>
</template>

<script>
import useBoardStore from '@/store/board.store';

export default {
  setup() {
    const boardStore = useBoardStore();
    return { boardStore };
  },
};
</script>
