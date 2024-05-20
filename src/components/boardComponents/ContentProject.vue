<template>
  <div v-for="list in lists" class="list">
    <div class="list-header">
      <h2>{{ list.name }}</h2>
      <div class="list-controls">
        <b-dropdown no-caret>
          <template #button-content>
            <font-awesome-icon :icon="['fas', 'ellipsis']" />
          </template>
          <b-dropdown-item >
            <b-link v-b-modal="'edit-list-'+list.id.toString()">Edit</b-link>
            <b-modal :id="'edit-list-'+list.id.toString()" centered>
              <template #title>
                Edit list : {{list.name}}
              </template>
            </b-modal>
          </b-dropdown-item>
          <b-dropdown-item>
            <b-link v-b-modal="'delete-list-'+list.id.toString()">Delete</b-link>
            <b-modal :id="'delete-list-'+list.id.toString()" centered>
              <template #title>
                Delete list : {{list.name}}
              </template>
              <p>Are you sure you want to delete this list ?</p>
            </b-modal>
          </b-dropdown-item>
        </b-dropdown>
        <b-button v-b-toggle="list.id.toString()" variant="none">
          <font-awesome-icon :icon="['fas', 'angle-up']" />
        </b-button>
      </div>
    </div>
    
    <b-collapse :id="list.id.toString()" class="list-body" visible>
      <b-card v-for="card in list.cards">
        <div class="card-header">
          <h5>{{card.name}}</h5>
          <div class="card-controls">
            <b-dropdown no-caret>
              <template #button-content>
                <font-awesome-icon :icon="['fas', 'ellipsis']" />
              </template>
              <b-dropdown-item >
                <b-link v-b-modal="'edit-card-'+card.id.toString()">Edit</b-link>
                <b-modal :id="'edit-card-'+card.id.toString()" centered>
                  <template #title>
                    Edit card : {{card.name}}
                  </template>
                </b-modal>
              </b-dropdown-item>
              <b-dropdown-item>
                <b-link v-b-modal="'delete-card-'+card.id.toString()">Delete</b-link>
                <b-modal :id="'delete-card-'+card.id.toString()" centered>
                  <template #title>
                    Delete card : {{card.name}}
                  </template>
                  <p>Are you sure you want to delete this card ?</p>
                </b-modal>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <p>{{card.description}}</p>
      </b-card>
    </b-collapse>
  </div>
  <a class="list new-list" @click.prevent="addList">
    <div class="list-body">
      <font-awesome-icon :icon="['fas', 'plus']" />[ Add new list ]
    </div>
  </a>
</template>

<script>
  export default {
    data() {
      return{
        lists : [
          {
            id: 1,
            name: 'backlog',
            cards: [
              {id:1, name: 'Card 1', description: 'Description 1'},
              {id:2, name: 'Card 2', description: 'Description 2'},
              {id:3, name: 'Card 3', description: 'Description 3'},
            ],
          },
          {
            id: 2,
            name: 'inProgress',
            cards: [
              {id:4, name: 'Card 4', description: 'Description 4'},
              {id:5, name: 'Card 5', description: 'Description 5'},
              {id:6, name: 'Card 6', description: 'Description 6'},
            ],
          },
          {
            id: 3,
            name: 'reviews',
            cards: [
              {id:7, name: 'Card 7', description: 'Description 7'},
              {id:8, name: 'Card 8', description: 'Description 8'},
              {id:9, name: 'Card 9', description: 'Description 9'},
            ]
          },
          {
            id: 4,
            name: 'rectify',
            cards: [
              {id:1, name: 'Card 1', description: 'Description 1'},
              {id:2, name: 'Card 2', description: 'Description 2'},
              {id:3, name: 'Card 3', description: 'Description 3'},
            ],
          },
          {
            id: 5,
            name: 'pull request',
            cards: [
              {id:4, name: 'Card 4', description: 'Description 4'},
              {id:5, name: 'Card 5', description: 'Description 5'},
              {id:6, name: 'Card 6', description: 'Description 6'},
            ],
          },
          {
            id: 6,
            name: 'done',
            cards: [
              {id:7, name: 'Card 7', description: 'Description 7'},
              {id:8, name: 'Card 8', description: 'Description 8'},
              {id:9, name: 'Card 9', description: 'Description 9'},
            ]
          },
        ]
      }
    },
    methods:{
      addList: function(){
        this.lists.push({id: this.lists.length+1, name: 'List '+(this.lists.length+1), cards: []})
      }
    }
  }
</script>