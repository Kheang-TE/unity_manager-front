<template>
  <div v-for="list in lists" class="list">
    <div class="list-header">
      <h2>{{ list.name }}</h2>
      <div class="list-controls">
          <font-awesome-icon :icon="['fas', 'ellipsis']" />
          <b-button v-b-toggle="list.id.toString()" variant="none">
            <font-awesome-icon :icon="['fas', 'angle-up']" />
          </b-button>
        </div>
    </div>
    <b-collapse :id="list.id.toString()" class="list-body" visible>
      <b-card v-for="card in list.cards">
        <p class="card-text">{{card.name}}</p>
        <p>{{card.description}}</p>
      </b-card>
    </b-collapse>
  </div>
  <a class="list new-list" @click.prevent="addList">
    <div class="list-body">
      <font-awesome-icon :icon="['fas', 'plus']" />[Add new list]
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