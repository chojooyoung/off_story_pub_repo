<template>
  <div class="container">
    <div id="user-info" class="row">
      <div class="col col-sm-4 col-lg-9">
        <img src="https://source.unsplash.com/random" alt="" />
        <div class="user-details">
          <div class="user-nickname">wherehows</div>
          <div class="user-introduce">나는 공부하는게 너무 싫습니다</div>
        </div>
      </div>
    </div>
    <div id="category" class="row">
      <div class="col col-sm-4 col-lg-9">
        <div class="category">
          <button class="OffStory">OffStory</button>
        </div>
      </div>
    </div>
    <div id="Divider" class="row">
      <div class="col col-sm-4 col-lg-9">
        <Divider />
      </div>
    </div>
    <div id="activity-filter" class="row">
      <div class="col col-sm-4 col-lg-9">
        <div class="activity-filter">
          <button class="admitted">참가 승인됨</button>
          <button class="denied">참가 거절됨</button>
          <button class="waiting">참가 대기중</button>
          <button class="closed">종료됨</button>
        </div>
      </div>
    </div>
    <div id="activity-list" class="row">
      <div class="col-sm-4 col-lg-9">
        <div class="activity-list"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Divider from '../components/designs/Divider'

export default {
  components: { Divider },
}
</script>

<style lang="scss" scoped>
$marginToTheTop: 30px;

.container {
  position: relative;
  top: 150px;
  .row {
    @include flexbox;
  }

  #user-info {
    .col {
      display: flex;
      img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
      }

      .user-details {
        margin-left: 20px;
      }
    }
  }

  #category {
    margin-top: $marginToTheTop;
  }

  #activity-filter {
    .col {
      position: relative;

      .activity-filter {
        position: absolute;
        right: 0;
      }
    }
  }

  #activity-list {
    margin-top: $marginToTheTop;
  }
}
</style>
