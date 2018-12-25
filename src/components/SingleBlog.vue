<template>
    <div id="single-blog">
      <h1>{{blog.title}}</h1>
      <article>{{blog.content}}</article>
      <p>分类:</p>
      <ul>
        <li v-for="category in blog.categories">
          {{category}}
        </li>
      </ul>
      <button @click="deleteSingleBlog()">删除</button>
      <router-link v-bind:to="'/edit/'+objectId">编辑</router-link>
    </div>
</template>

<script>
    export default {
      name: "SingleBlog",
      data(){
          return{
            objectId:this.$route.params.objectId,
            blog:{}
          }
      },
      created(){
        console.log(this.$route.params.objectId);
        const blog=Bmob.Query('BlogArticle');
          blog.get(this.objectId).then(res=>{
            this.blog=res
          }).catch(err=>{
            console.log(err);
          })
      },
      methods:{
        deleteSingleBlog:function () {
          const blog=Bmob.Query('BlogArticle');
          blog.destroy(this.objectId).then(res => {
            this.$router.push({path:'/'})
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped lang="stylus">
#single-blog
  max-width 960px
  margin 0 auto
  padding 20px
  background #eeeeee
</style>
