<template>
  <div id="add-blog">
    <h1>添加博客</h1>
    <form action="" v-if="!submited" class="edit-blog">
      <label class="title">博客标题</label>
      <input type="text" v-model="blog.title">

      <label class="title">博客内容</label>
      <textarea v-model="blog.content"></textarea>

      <div id="checkboxes">
        <div class="checkbox-item">
          <label>Vue.js</label>
          <input type="checkbox" value="Vue.js" v-model="blog.categories">
        </div>
        <div class="checkbox-item">
          <label>Node.js</label>
          <input type="checkbox" value="Node.js" v-model="blog.categories">
        </div>
        <div class="checkbox-item">
          <label>React.js</label>
          <input type="checkbox" value="React.js" v-model="blog.categories">
        </div>
        <div class="checkbox-item">
          <label>Angular.js</label>
          <input type="checkbox" value="Angular.js" v-model="blog.categories">
        </div>
      </div>
      <label class="title">作者:</label>
      <select v-model="blog.author">
        <option v-for="author in authors">
          {{author}}
        </option>
      </select>
      <button v-on:click.prevent="uploadBlog()">添加博客</button>
    </form>


    <div v-if="submited" class="submit-tips">
      <h3>您的博客发布成功!</h3>
    </div>

    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题:{{blog.title}}</p>
      <p>博客内容:</p>
      <p>{{blog.content}}</p>
      <p>博客分类:</p>
      <ul>
        <li v-for="category in blog.categories">
          {{category}}
        </li>
      </ul>
      <p>作者:{{blog.author}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddBlog",
    data() {
      return {
        blog: {
          title: '',
          content: '',
          categories: [],
          author: ''
        },
        authors: ["虎一", "虎二", "虎三"],
        submited: false,
      }
    },
    methods: {
      uploadBlog:function(){
        const blog=Bmob.Query('BlogArticle');
        blog.set("title",this.blog.title);
        blog.set("content",this.blog.content);
        blog.set("categories",this.blog.categories);
        blog.set("author",this.blog.author);
        blog.save().then(res => {
          this.submited=true
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },

  }
</script>

<style scoped>

</style>
