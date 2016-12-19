<template>
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
            <a class="navbar-brand" v-link="{ path: '/'}">我的问卷</a>
        </div>
        <div class="navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a v-link="{ path: '/list'}" class="title">调查问卷</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a v-link="{ path: '/new'}" class="title">新建问卷</a></li>
            </ul>
        </div>
      </div>
    </nav>
</template>
<script>
</script>