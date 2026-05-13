<template>
  <div class="container-fluid">
    <div class="row page-titles">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:void(0)">Email</a></li>
        <li class="breadcrumb-item active"><a href="javascript:void(0)">Read</a></li>
      </ol>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <EmailRightContent />
              <div class="col-xl-9 col-xxl-8">
                <div>
                  <div class="row">
                    <div class="col-12">
                      <div class="right-box-padding">
                        <div class="toolbar mb-4" role="toolbar">
                          <div class="btn-group mb-1">
                            <button type="button" class="btn btn-primary light px-3"><i class="fa fa-archive"></i></button>
                            <button type="button" class="btn btn-primary light px-3"><i class="fa fa-exclamation-circle"></i></button>
                            <button type="button" class="btn btn-primary light px-3 me-1"><i class="fa fa-trash"></i></button>
                          </div>
                          <div class="btn-group mb-1 me-1">
                            <button type="button" class="btn btn-primary light dropdown-toggle px-3" data-bs-toggle="dropdown">
                              <i class="fa fa-folder"></i> <b class="caret m-l-5"></b>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript: void(0);">Social</a>
                              <a class="dropdown-item" href="javascript: void(0);">Promotions</a>
                              <a class="dropdown-item" href="javascript: void(0);">Updates</a>
                              <a class="dropdown-item" href="javascript: void(0);">Forums</a>
                            </div>
                          </div>
                          <div class="btn-group mb-1 me-1">
                            <button type="button" class="btn btn-primary light dropdown-toggle px-3" data-bs-toggle="dropdown">
                              <i class="fa fa-tag"></i> <b class="caret m-l-5"></b>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript: void(0);">Updates</a>
                              <a class="dropdown-item" href="javascript: void(0);">Social</a>
                              <a class="dropdown-item" href="javascript: void(0);">Promotions</a>
                              <a class="dropdown-item" href="javascript: void(0);">Forums</a>
                            </div>
                          </div>
                          <div class="btn-group mb-1">
                            <button type="button" class="btn btn-primary light dropdown-toggle v" data-bs-toggle="dropdown">
                              More <span class="caret m-l-5"></span>
                            </button>
                            <div class="dropdown-menu">
                              <a class="dropdown-item" href="javascript: void(0);">Mark as Unread</a>
                              <a class="dropdown-item" href="javascript: void(0);">Add to Tasks</a> <a class="dropdown-item" href="javascript: void(0);">Add Star</a>
                              <a class="dropdown-item" href="javascript: void(0);">Mute</a>
                            </div>
                          </div>
                          <div :class="`email-tools-box float-end mb-2 ${emaiComposeMenuToggle ? 'active' : ''}`" @click="emaiComposeMenuToggle = !emaiComposeMenuToggle">
                            <i class="fa-solid fa-list-ul"></i>
                          </div>
                        </div>
                        <div class="read-content">
                          <div class="media pt-3 d-sm-flex d-block justify-content-between">
                            <div class="clearfix mb-3 d-flex">
                              <img class="me-3 rounded" width="70" height="70" alt="image" src="../../../assets/images/avatar/1.jpg" />
                              <div class="media-body me-2">
                                <h5 class="text-primary mb-0 mt-1">Ingredia Nutrisha</h5>
                                <p class="mb-0">20 May 2020</p>
                              </div>
                            </div>
                            <div class="clearfix mb-3">
                              <a
                                v-for="({ icon, name }, ind) in tootipIcon"
                                :key="ind"
                                style="position: relative"
                                href="javascript:void()"
                                class="btn btn-primary px-3 my-1 light me-2"
                                @mouseover="
                                  tooltip.reply = true;
                                  tooltip.index = ind;
                                "
                                @mouseout="tooltip.reply = false"
                                ><i :class="icon"> </i>
                                <div
                                  :class="`tooltip bs-tooltip-auto fade ${tooltip.index == ind ? (tooltip.reply ? 'show' : '') : ''}`"
                                  role="tooltip"
                                  id="tooltip159414"
                                  data-popper-placement="top"
                                  style="position: absolute; inset: auto auto 0px 0px; margin: 0px; top: -40px"
                                >
                                  <div class="tooltip-arrow" style="position: absolute; left: 50%; transform: translate(-50%, 0px); bottom: 40px"></div>
                                  <div class="tooltip-inner">{{ name }}</div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <hr />
                          <div class="media mb-2 mt-3">
                            <div class="media-body">
                              <span class="pull-end">07:23 AM</span>
                              <h5 class="my-1 text-primary">A collection of textile samples lay spread</h5>
                              <p class="read-content-email">To: Me, info@example.com</p>
                            </div>
                          </div>
                          <div class="read-content-body">
                            <h5 class="mb-4">Hi,Ingredia,</h5>
                            <p class="mb-2">
                              <strong>Ingredia Nutrisha,</strong> A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and
                              above it there hung a picture
                            </p>
                            <p class="mb-2">
                              Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of
                              blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. Aenean vulputate eleifend tellus. Aenean leo ligula,
                              porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                            </p>
                            <p class="mb-2">
                              Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                              viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                              augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
                              libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
                            </p>
                            <h5 class="pt-3">Kind Regards</h5>
                            <p>Mr Smith</p>
                            <hr />
                          </div>
                          <div class="read-content-attachment">
                            <button class="btn btn-secondary btn-sm me-1"><i class="fa-solid fa-reply me-1"></i>Reply</button>
                            <button type="button" class="btn btn-primary btn-sm"><i class="fa-solid fa-forward me-1"></i>Forward</button>
                          </div>
                          <hr />
                          <div class="mb-3 pt-3">
                            <textarea
                              name="write-email"
                              id="write-email"
                              cols="30"
                              rows="5"
                              class="form-control"
                              placeholder="It's really an amazing.I want to know more about it..!"
                            ></textarea>
                          </div>
                        </div>
                        <div class="text-end">
                          <button class="btn btn-primary" type="button">Send</button>
                        </div>
                      </div>
                    </div>
                  </div>
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
import { defineComponent, reactive } from "vue";
import EmailRightContent from "@/elements/EmailRightContent.vue";
import { useStore } from "@/stores/Store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "email_",
  components: { EmailRightContent },
  data(vm) {
    return {
      tootipIcon: [
        { icon: "fa fa-reply", name: "Reply" },
        { icon: "fa fa-arrow-right", name: "Forward" },
        { icon: "fa fa-trash", name: "Delet" },
      ],
    };
  },
  setup() {
    const { emaiComposeMenuToggle } = storeToRefs(useStore());
    const tooltip = reactive({
      reply: false,
      index: NaN,
    });
    return { emaiComposeMenuToggle, tooltip };
  },
});
</script>
