<template>
  <component :is="'div'" @click="onClick">
    <v-card ripple tile>
      <v-responsive :aspect-ratio="2 / 3">
        <div class="image-wrapper">
          <div class="image-content">
            <div class="d-flex flex-wrap fill-height">
              <div class="image" v-for="book in books.data.slice(0, 4)" :key="book['book_cover']">
                <v-card flat>
                  <v-img :aspect-ratio="2 / 3" :src="coverCache[book['book_cover']]"> </v-img>
                </v-card>
              </div>
            </div>
          </div>
        </div>
      </v-responsive>
    </v-card>
    <div class="book-name-wrapper">
      <div class="pa-0 d-flex book-name">
        <div class="d-flex fill-height flex-column justify-center">
          <div class="category-text">
            {{ books['group_name'] }}
          </div>
        </div>
      </div>
      <div class="book-info">共{{ books.data.length }}本</div>
    </div>
  </component>
</template>

<script>
  import { getImagePath } from '@/util/read'
  import { mapGetters } from 'vuex'
  import router from '@/router'

  export default {
    name: 'BookGroupCard',
    props: {
      books: Object,
      disable: Boolean
    },
    computed: {
      ...mapGetters('book',['coverCache'])
    },
    methods: {
      onClick() {
        if (!this.disable) {
          router.push({ name: 'Bookshelf', params: { gid: this.books.gid } })
        }
      }
    },
    created() {
      this.books.data.slice(0, 4).forEach((book, index) => {
        getImagePath(book['book_cover'], book['book_path'])
      })
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/styles/mixin';

  .image-wrapper {
    padding: 3px;
    height: 100%;
    width: 100%;

    .image-content {
      background-color: #e9e5e5;
      height: 100%;
      width: 100%;

      .image {
        flex: 0 0 50%;
        max-width: 50%;
        padding: 5.2px 3px;
      }
    }
  }

  .book-name-wrapper {
    margin-top: 6px;
    .book-name {
      height: 40px;
      font-size: 0.8rem;
    }
    .book-info {
      font-size: 0.6rem;
      opacity: 0.7;
    }
  }

  .category-text {
    @include ellipsis2(2);
  }
</style>
