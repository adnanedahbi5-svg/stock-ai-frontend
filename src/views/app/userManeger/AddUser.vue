<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Profile</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Edit Profile</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-xl-3 col-lg-4">
        <div class="clearfix">
          <div class="card card-bx profile-card author-profile m-b30">
            <div class="card-body">
              <div class="p-5">
                <div class="author-profile">
                  <div class="author-media">
                    <img src="../../../assets/images/profile/pic1.jpg" alt="" />
                    <div class="upload-link" title="" data-toggle="tooltip" data-placement="right" data-original-title="update">
                      <input type="file" class="update-flie" />
                      <i class="fa fa-camera"></i>
                    </div>
                  </div>
                  <div class="author-info">
                    <h6 class="title">John</h6>
                    <span>Developer</span>
                  </div>
                </div>
              </div>
              <div class="info-list">
                <ul>
                  <li><RouterLink to="/app-profile">Models</RouterLink><span>36</span></li>
                  <li><RouterLink to="/uc-lightgallery">Gallery</RouterLink><span>3</span></li>
                  <li><RouterLink to="/app-profile">Lessons</RouterLink><span>1</span></li>
                </ul>
              </div>
            </div>
            <div class="card-footer">
              <div class="input-group mb-3">
                <div class="form-control rounded text-center">Portfolio</div>
              </div>
              <div class="input-group">
                <a target="_blank" href="https://www.dexignlab.com/" class="form-control text-primary rounded text-start">https://www.dexignlab.com/</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-9 col-lg-8">
        <div class="card profile-card card-bx m-b30">
          <div class="card-header">
            <h6 class="card-title">Account setup</h6>
          </div>
          <form class="profile-form">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Name</label>
                  <input type="text" class="form-control" value="John" />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Surname</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Specialty</label>
                  <input type="text" class="form-control" value="Developer" />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Skills</label>
                  <input type="text" class="form-control" value="HTML,  JavaScript,  PHP" />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Gender</label>
                  <CustomSelectOption2 padding="7px" class="default-select form-control" valueOne="Please select" valueTwo="Male" valueThree="Female" valueFour="Other" />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Birth</label>
                  <input type="date" class="form-control" />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Phone</label>
                  <input type="number" class="form-control" value="12345" />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Email address</label>
                  <input type="text" class="form-control" value="demo@gmail.com" />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">Country</label>
                  <CustomSelectOption2
                    padding="7px"
                    class="default-select form-control"
                    valueOne="Please select"
                    valueTwo="Russia"
                    valueThree="Canada"
                    valueFour="China"
                    valueFive="India"
                  />
                </div>
                <div class="col-sm-6 m-b30">
                  <label class="form-label">City</label>
                  <CustomSelectOption2
                    padding="7px"
                    class="default-select form-control"
                    id="validationCustom02"
                    valueOne="Please select"
                    valueTwo="Krasnodar"
                    valueThree="Tyumen"
                    valueFour="Chelyabinsk"
                    valueFive="Moscow"
                  />
                </div>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary">UPDATE</button>
              <RouterLink to="/page-register" class="btn-link">Forgot your password?</RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CustomSelectOption2 from "@/components/CustomSelectOption2.vue";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "addUser_",
  components: { CustomSelectOption2, RouterLink },
  setup() {
    return {};
  },
});
</script>
