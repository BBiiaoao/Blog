<template>
  <div id="show-blogs">
    <transition name="blog-title-transition">
      <p class="blog-title" v-if="show">Blog</p>
    </transition>
    <transition name="blog-search-transition">
      <div class="blog-search" v-if="show">
        <div class="icon-container">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
          </svg>
          <svg class="icon icon-blue" aria-hidden="true">
            <use xlink:href="#icon-search-blue"></use>
          </svg>
        </div>
        <div class="input-bar-container">
          <input style="outline: none" class="input-bar" type="text" v-model="search" placeholder="搜索">
        </div>
      </div>
    </transition>
    <transition name="blog-article-transition">
      <div class="article-container">
        <div class="single-blog-container" v-for="(blog,index) in filteredBlogs" v-on:mouseover="showWidth()">
          <div class="single-blog" v-if="index<count">
            <div class="front">
              <router-link v-bind:to="'/blog/'+blog.objectId">
                <h2 class="single-blog-title">{{blog.title}}</h2>
              </router-link>
              <article class="single-blog-content">
                {{blog.content}}
              </article>
            </div>
            <div class="back">
              <router-link v-bind:to="'/blog/'+blog.objectId">
                <h2 class="single-blog-title">{{blog.title}}</h2>
                <p class="single-blog-author">作者:{{blog.author}}</p>
                <br>
                <div class="single-blog-categories">
                  <div class="categories-left">
                    <p>种类</p>
                  </div>
                  <div class="categories-right">
                    <div class="category" v-for="category in blog.categories"><p>{{category}}</p></div>
                  </div>
                </div>
                <br>
                <p class="single-blog-time">发布时间: {{reduceDate(blog.createdAt)}}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="show-allBlogs" v-if="dropDown">
      <div class="font-container" v-on:click="loadBlogs()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-more"></use>
        </svg>
      </div>
      <div class="label" v-on:click="loadBlogs()">
        <p>MORE</p>
      </div>
    </div>
    <div class="show-allBlogs" v-if="!dropDown">
      <div class="font-container" v-on:click="shrinkBlogs()">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-top-copy"></use>
        </svg>
      </div>
      <div class="label" v-on:click="shrinkBlogs()">
        <p>回到顶部</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShowBlog",
    data() {
      return {
        blogs: [],
        search: '',
        dropDown: true,
        show: true,
        count: 3
      }
    },
    methods: {
      reduceDate: function (str) {
        return str.split(' ')[0]
      },
      loadBlogs: function () {
        const blogs = Bmob.Query("BlogArticle");
        blogs.order("-createdAt");
        blogs.find().then(res => {
          this.blogs = res;
        });
        this.dropDown = false;
        this.show = false;
        this.count = this.blogs.length
      },
      shrinkBlogs: function () {
        for (let i = this.blogs.length; i > 3; i--) {
          this.blogs.pop()
        }
        this.dropDown = true;
        this.show = true;
        this.count = 3
      },
      showWidth:function (el) {
        console.log(el.style.width);
      }
    },
    created() {
      const blogs = Bmob.Query("BlogArticle");
      blogs.order("-createdAt");
      blogs.find().then(res => {
        this.blogs = res;
      })
    },
    computed: {
      filteredBlogs: function () {
        //filter()把传入的函数依次作用于每个元素
        //然后根据返回值是true还是false决定保留还是丢弃该元素
        return this.blogs.filter((blog) => {
          return blog.title.match(this.search)
        })
      }
    },
  }
</script>

<style scoped lang="stylus">
  @import "../assets/stylus/ShowBlog.styl"
</style>
