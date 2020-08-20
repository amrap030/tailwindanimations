<template>
  <div>
    <!-- <div class="flex flex-col h-screen">
      <StickyHeader />
      <div class="flex flex-1 min-w-0 overflow-hidden bg-gray-100">
        <SideBar />

    <div class="w-full min-h-0">-->
    <main class="flex h-full p-8 overflow-hidden">
      <div class="w-full bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow">
        <vuescroll :ops="ops">
          <div class="p-8 m-8 bg-gray-100 divide-y rounded-lg">
            <div class="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4 pb-8">
              <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              -->

              <div class="col-span-1 row-span-1">
                <h2 class="text-xl font-medium leading-6 text-gray-900">Acount</h2>
                <p class="mt-2 text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div
                class="col-span-2 row-span-1 overflow-hidden transition-all transform bg-white rounded-lg shadow sm:w-full"
              >
                <div class="px-4 pt-5 pb-4 sm:p-6">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left">
                    <div>
                      <label
                        for="username"
                        class="block text-sm font-medium leading-5 text-gray-700"
                      >Username</label>
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                          id="username"
                          class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                          placeholder="amrap030"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <label
                        for="email"
                        class="block text-sm font-medium leading-5 text-gray-700"
                      >Email address</label>
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                          id="email"
                          class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                          placeholder="kevin.hertwig@t-online.de"
                        />
                      </div>
                    </div>
                    <div class="mt-4">
                      <label
                        for="photo"
                        class="block text-sm font-medium leading-5 text-gray-700"
                      >Photo</label>
                      <div class="relative mt-2 rounded-md">
                        <Avatar
                          username="amrap030"
                          :customStyle="{
                            height: '3.5rem !important',
                            width: '3.5rem !important',
                            fontSize: '20px !important'
                          }"
                        ></Avatar>
                        <!-- <input
                                id="photo"
                                class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                                placeholder="username"
                        />-->
                      </div>
                    </div>
                    <vue-dropzone
                      ref="myVueDropzone"
                      id="customdropzone"
                      :options="dropzoneOptions"
                      :include-styling="false"
                      :useCustomSlot="true"
                    >
                      <div class="dropzone-custom-content">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-10 h-10 mx-auto text-gray-400"
                        >
                          <path
                            d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71-2.75 3.54zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"
                          />
                        </svg>
                        <h3 class="mt-2 font-medium text-purple-700">
                          Upload a file
                          <span class="text-gray-500">or drag and drop</span>
                        </h3>
                        <div class="text-sm font-thin text-gray-400">PNG, JPG, GIF up to 10MB</div>
                      </div>
                    </vue-dropzone>
                  </div>
                  <span class="flex mt-4 space-x-3 rounded-md sm:w-auto">
                    <button
                      type="button"
                      class="inline-flex justify-center px-4 py-2 text-base font-medium leading-6 text-purple-600 transition duration-150 ease-in-out border-transparent rounded-md bg-purple-50 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                    >Change Password</button>
                    <button
                      type="button"
                      class="inline-flex justify-center px-4 py-2 text-base font-medium leading-6 text-red-600 transition duration-150 ease-in-out border border-transparent rounded-md bg-red-50 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                    >Delete Account</button>
                  </span>
                </div>
                <div class="px-4 py-3 rounded-b-lg bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-purple-700 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                    >Save</button>
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4 pt-8 pb-8">
              <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              -->

              <div class="col-span-1 row-span-1">
                <h2 class="text-xl font-medium leading-6 text-gray-900">Notifications</h2>
                <p
                  class="mt-2 text-gray-500"
                >Decide which communications you'd like to receive and how.</p>
              </div>

              <div
                class="col-span-2 row-span-1 overflow-hidden transition-all transform bg-white rounded-lg shadow sm:w-full"
              >
                <div class="px-4 pt-5 pb-4 space-y-8 sm:p-6">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3
                        class="text-lg font-medium leading-6 text-gray-700"
                        id="modal-headline"
                      >By Email</h3>
                      <div class="mt-4">
                        <div class="flex items-center">
                          <input
                            id="updates"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                          />
                          <label for="updates" class="block ml-4 leading-5 text-gray-700">Updates</label>
                        </div>
                        <p class="ml-8 text-gray-400">Get notified when the app has new updates.</p>
                      </div>
                      <div class="mt-4">
                        <div class="flex items-center">
                          <input
                            id="content"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                          />
                          <label
                            for="content"
                            class="block ml-4 leading-5 text-gray-700"
                          >New content</label>
                        </div>
                        <p class="ml-8 text-gray-400">
                          Get notified when the new content is provided to your
                          application.
                        </p>
                      </div>
                      <div class="mt-4">
                        <div class="flex items-center">
                          <input
                            id="ads"
                            type="checkbox"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-checkbox"
                          />
                          <label for="ads" class="block ml-4 leading-5 text-gray-700">Advertisement</label>
                        </div>
                        <p class="ml-8 text-gray-400">Get information about new products.</p>
                      </div>
                    </div>
                  </div>
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3
                        class="text-lg font-medium leading-6 text-gray-700"
                        id="modal-headline"
                      >Push Notifications</h3>

                      <div class="flex flex-col mt-4">
                        <label class="inline-flex items-center">
                          <input
                            type="radio"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
                            name="notification"
                            value="everything"
                          />
                          <span class="ml-4 leading-5 text-gray-700">Everything</span>
                        </label>
                        <label class="inline-flex items-center mt-4">
                          <input
                            type="radio"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
                            name="notification"
                            value="same"
                          />
                          <span class="ml-4 leading-5 text-gray-700">Same as email</span>
                        </label>
                        <label class="inline-flex items-center mt-4">
                          <input
                            type="radio"
                            class="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
                            name="notification"
                            value="no"
                          />
                          <span class="ml-4 leading-5 text-gray-700">No push notifications</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="px-4 py-3 rounded-b-lg bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-purple-700 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                    >Save</button>
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4 pt-8">
              <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              -->

              <div class="col-span-1 row-span-1">
                <h2 class="text-xl font-medium leading-6 text-gray-900">Application</h2>
                <p class="mt-2 text-gray-500">Customize your application.</p>
              </div>

              <div
                class="col-span-2 row-span-1 overflow-hidden transition-all transform bg-white rounded-lg shadow sm:w-full"
              >
                <div class="px-4 pt-5 pb-4 space-y-8 sm:p-6">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:text-left">
                      <Languages />
                      <Units class="mt-4" />
                    </div>
                  </div>
                </div>

                <div class="px-4 py-3 rounded-b-lg bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-purple-700 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                    >Save</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </vuescroll>
      </div>
    </main>

    <!-- <main class="flex h-full p-8 overflow-hidden">
            <div
              class="w-full p-8 bg-white dark:bg-gray-900 sm:rounded-lg sm:shadow"
            >
              <vuescroll :ops="ops">
                <div class="p-8 bg-gray-100 divide-y rounded-lg">
                  <div
                    class="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4 pb-8"
    >-->
    <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->

    <!-- <div class="col-span-1 row-span-1">
                      <h2 class="text-xl font-medium leading-6 text-gray-900">
                        Profile
                      </h2>
                      <p class="mt-2 text-gray-400">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div
                      class="col-span-2 row-span-1 overflow-hidden transition-all transform bg-white rounded-lg shadow sm:w-full"
                    >
                      <div class="px-4 pt-5 pb-4 sm:p-6">
                        <div class="mt-3 text-center sm:mt-0 sm:text-left">
                          <div>
                            <label
                              for="username"
                              class="block text-sm font-medium leading-5 text-gray-700"
                              >Username</label
                            >
                            <div class="relative mt-1 rounded-md shadow-sm">
                              <input
                                id="username"
                                class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                                placeholder="username"
                              />
                            </div>
                          </div>
                          <div class="mt-4">
                            <label
                              for="photo"
                              class="block text-sm font-medium leading-5 text-gray-700"
                            >
                              Photo
                            </label>
                            <div class="relative mt-2 rounded-md">
                              <Avatar
                                username="Kevin Hertwig"
                                :customStyle="{
                                  height: '3.5rem !important',
                                  width: '3.5rem !important',
                                  fontSize: '20px !important',
                                }"
    ></Avatar>-->
    <!-- <input
                                id="photo"
                                class="block w-full form-input sm:text-sm sm:leading-5 focus:outline-none focus:border-purple-300 focus:shadow-outline-purple"
                                placeholder="username"
    />-->
    <!-- </div>
                          </div>
                          <vue-dropzone
                            ref="myVueDropzone"
                            id="customdropzone"
                            :options="dropzoneOptions"
                            :include-styling="false"
                            :useCustomSlot="true"
                            ><div class="dropzone-custom-content">
                              <h3 class="text-purple-700">
                                Upload a file
                                <span class="text-gray-500"
                                  >or drag and drop</span
                                >
                              </h3>
                              <div class="text-sm font-hairline text-gray-400">
                                PNG, JPG, GIF up to 10MB
                              </div>
                            </div></vue-dropzone
                          >
                        </div>
                      </div>
                      <div
                        class="px-4 py-3 rounded-b-lg bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse"
                      >
                        <span
                          class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto"
                        >
                          <button
                            type="button"
                            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-purple-700 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                          >
                            Save
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    class="grid grid-flow-col grid-cols-3 grid-rows-1 gap-4 pt-8"
    >-->
    <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->

    <!-- <div class="col-span-1 row-span-1">
                      <h2 class="text-xl font-medium leading-6 text-gray-900">
                        Profile
                      </h2>
                      <p class="mt-2 text-gray-400">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div
                      class="col-span-2 row-span-1 overflow-hidden transition-all transform bg-white rounded-lg shadow sm:w-full"
                    >
                      <div class="px-4 pt-5 pb-4 sm:p-6">
                        <div class="sm:flex sm:items-start">
                          <div class="mt-3 text-center sm:mt-0 sm:text-left">
                            <h3
                              class="text-lg font-medium leading-6 text-gray-900"
                              id="modal-headline"
                            >
                              Deactivate account
                            </h3>
                            <div class="mt-2">
                              <p class="text-sm leading-5 text-gray-500">
                                Are you sure you want to deactivate your
                                account? All of your data will be permanently
                                removed. This action cannot be undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="px-4 py-3 rounded-b-lg bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse"
                      >
                        <span
                          class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto"
                        >
                          <button
                            type="button"
                            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-purple-700 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-5"
                          >
                            Save
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div> 
              </vuescroll>
            </div>
    </main>-->
    <!-- </div>
      </div>
    </div>-->
  </div>
</template>

<script>
//import SideBar from "@/components/SideBar";
//import StickyHeader from "@/components/StickyHeader";
import vuescroll from "vuescroll";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import Avatar from "vue-avatar";
import Languages from "@/components/Languages";
import Units from "@/components/Units";

// import simplebar from "simplebar-vue";
// import "simplebar/dist/simplebar.min.css";
// import gql from "graphql-tag";

export default {
  name: "Settings",
  components: {
    //SideBar,
    //StickyHeader,
    vuescroll,
    vueDropzone: vue2Dropzone,
    Avatar,
    Languages,
    Units
  },
  data() {
    return {
      exercises: [],
      exerciseIds: [],
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      ops: {
        vuescroll: {},
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: "right"
        },
        rail: {},
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "#c0c0c0",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "6px",
          disable: false
        }
      }
    };
  },
  computed: {},
  methods: {}
};
</script>

<style>
.dropzone-custom-content {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

#customdropzone {
  background-color: white;
  font-family: "Arial", sans-serif;
  letter-spacing: 0.2px;
  color: #777;
  transition: background-color 0.2s linear;
  height: 200px;
  padding: 40px;
  @apply border-2 border-dashed rounded-lg mt-3 cursor-pointer;
}

#customdropzone .dz-preview {
  width: 160px;
  display: inline-block;
}
#customdropzone .dz-preview .dz-image {
  width: 80px;
  height: 80px;
  margin-left: 40px;
  margin-bottom: 10px;
}
#customdropzone .dz-preview .dz-image > div {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background-size: contain;
}
#customdropzone .dz-preview .dz-image > img {
  width: 100%;
}

#customdropzone .dz-preview .dz-details {
  color: white;
  transition: opacity 0.2s linear;
  text-align: center;
}
#customdropzone .dz-success-mark,
.dz-error-mark,
.dz-remove {
  display: none;
}
</style>
