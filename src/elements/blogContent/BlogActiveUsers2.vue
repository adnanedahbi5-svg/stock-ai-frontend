<template>
  <div class="col-xl-9 col-lg-7">
    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header border-0">
            <h4 class="heading mb-0 blog-title">Active users</h4>
            <a href="javascript:void(0)" class="btn btn-primary btn-sm">More</a>
          </div>
          <div class="card-body">
            <div class="blog-img">
              <img src="../../assets/images/blog/professional2.jpg" alt="" class="blk-img2" />
              <div class="blog-text">
                <h2>This quote highlights the importance of writing clear.</h2>
                <img src="../../assets/images/contacts/pic1.jpg" class="avatar rounded-circle me-2 small-post" alt="" />
                <span>Hary in February 05, 2023</span>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6" v-for="({ badge, badgeColor, date, img2, name, title }, ind) in activeUsers" :key="ind">
                <div class="seconday-post">
                  <!-- <img :src="img" alt="" /> -->
                  <div class="post-1">
                    <div class="post-data">
                      <span :class="`badge ${badgeColor} border-0 badge-sm`">{{ badge }}</span>
                      <h4>
                        {{ title }}
                      </h4>
                      <div>
                        <img :src="img2" class="avatar rounded-circle me-2 small-post" alt="" />
                        <span
                          ><b class="text-primary">{{ name }}</b
                          >{{ date }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-12">
        <div class="card">
          <div class="card-header border-0">
            <h4 class="heading mb-0 blog-title">READ MORE</h4>
            <a href="javascript:void(0)" class="btn btn-primary btn-sm">More</a>
          </div>
          <div class="card-body">
            <div class="third-post" v-for="({ badge, badgeColor, date, img2, name, title }, ind) in activeUsers" :key="ind">
              <!-- <img :src="img" alt="" /> -->
              <div class="post-1">
                <div class="post-data">
                  <span :class="`badge ${badgeColor} border-0 badge-sm`">{{ badge }}</span>
                  <a href="javascript:void(0);"
                    ><h4>
                      {{ title }}
                    </h4></a
                  >
                  <div class="mb-2">
                    <img :src="img2" class="avatar rounded-circle me-2 small-post" alt="" />
                    <span
                      ><b class="text-primary">{{ name }}</b
                      >{{ date }}</span
                    >
                  </div>
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum the industry's standard dummy text ever since the 1500s, when
                    an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IMAGE from "@/constent/Theme";
import { defineComponent } from "vue";

export default defineComponent({
  name: "blogActiveUsers_2",
  setup() {
    return {
      activeUsers: [
        {
          // img: IMAGE.blog,
          img2: IMAGE.contactPic1,
          badge: "MARKETING",
          badgeColor: "badge-warning",
          title: "Good programmers write code that humans can understand.",
          name: "Honey",
          date: " in March 05, 2024",
        },
        {
          // img: IMAGE.blogS2,
          img2: IMAGE.contactPic2,
          badge: "MARKETING",
          badgeColor: "badge-primary",
          title: "rogramming isn t about what you know its about what you can figure out.",
          name: "Honey",
          date: " in April 05, 2024",
        },
        {
          // img: IMAGE.blogS3,
          img2: IMAGE.contactPic1,
          badge: "SOFTWARE",
          badgeColor: "badge-secondary",
          title: "Debugging is like being a detective in a crime movie where youre also the murderer.",
          name: "Lisa",
          date: " in April 05, 2024",
        },
        {
          // img: IMAGE.blogS4,
          img2: IMAGE.contactPic2,
          badge: "DESIGNER",
          badgeColor: "badge-info ",
          title: "The best way to predict the future is to invent it.",
          name: "Mona",
          date: " in April 05, 2024",
        },
      ],
    };
  },
});
</script>

<style scoped></style>
