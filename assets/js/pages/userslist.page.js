parasails.registerPage('userslist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    syncing: false,
    cloudError: '',
    saved: false,
    uploadStarted: false,
    uploadError: false,
    item: {},
    saveModel: false,
    deleteModelOpen: false,
    deleted: false,
    allSelected: false,
    selectedItems: [],

    listView: '/userslist',



    formData: {
      id: '0',
      search: '',
      name: '',
      email: '',
      password: '',
      contact: '',
      gender: '',
      country: '',
      city: '',
      howDidYouHearAboutUs: '',
      isSuperAdmin: "false",
    }
    //…
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {


    if (this.filter) {
      this.formData.search = this.filter.name;
    }
    //…
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    selectAll: function() {

      this.selectedItems = [];

      if (!this.allSelected) {
        for (i in this.data) {
          this.selectedItems.push(this.data[i].id);
        }
      }
    },

    select: function() {
      this.allSelected = false;
    },


    // PEGINATION
    pagination: function(selectedPage, pageCount) {

      var array = [],
        j = 0;

      if (selectedPage + 10 < pageCount) {
        pageCount = selectedPage + 10;
      }

      if (selectedPage - 10 <= 0) {
        selectedPage = 0;
      } else {
        selectedPage = selectedPage - 10
      }

      for (var i = selectedPage; i <= pageCount; i++) {
        array[j] = i;
        j++;
      }

      return array;

    },

    removeItem: function(id) {

      var selectedArr = [];
      if (id) {
        selectedArr.push(id);
      }

      console.log("this.selectedItems");
      console.log(this.selectedItems);

      this.selectedItems = selectedArr;

      if (this.selectedItems.length == 0) {

        alert("Please select an item!");

      } else {

        this.deleteModelOpen = true;

      }

    },

    closeDeleteModal: function() {

      this.deleteModelOpen = false;
      this.cloudError = '';

    },

    handleParsingDeleteForm: function() {

      return {
        selectedItems: this.selectedItems,

      };

    },

    submittedDeleteForm: function(result) {

      if (result.result) {

        for (i = 0; i < result.result.length; i++) {
          _.remove(this.data, {
            id: result.result[i].id
          });
        }

        this.deleteModelOpen = false;
        this.cloudError = '';
        this.deleted = true;

        setTimeout(function() {
          $("#delete-alert").hide();
        }, 5000);

        this.$forceUpdate();

      }

    },

    clickItem: function(item) {
      // this.saveModel = true;
      $("#myModal").modal('show');
      console.log("item");
      console.log(item);
      if (item) {
        this.item = item;
        this.formData.id = item.id;
        this.formData.name = item.fullName;
        this.formData.email = item.emailAddress;
        this.formData.password = item.password;
        this.formData.contact = item.contact;
        this.formData.gender = item.gender;
        this.formData.country = item.country;
        this.formData.city = item.city;
        this.formData.howDidYouHearAboutUs = item.howDidYouHearAboutUs;
        this.formData.isSuperAdmin = (item.isSuperAdmin == true) ? "true" : "false";

      } else {

        this.formData.id = "";
        this.formData.name = "";
        this.formData.email = "";
        this.formData.password = "";
        this.formData.contact = "";
        this.formData.gender = "";
        this.formData.country = "";
        this.formData.city = "";
        this.formData.howDidYouHearAboutUs = "";
        this.formData.isSuperAdmin = "false";
      }

    },

    handleParsingForm: function() {

      this.formErrors = {};
      this.saved = false;

      var argins = this.formData;

      console.log(argins);

      if (!argins.name) {

        this.formErrors.name = true;

      }

      // if (!argins.ammount) {
      //
      //   this.formErrors.ammount = true;
      //
      // }

      if (Object.keys(this.formErrors).length > 0) {

        return
      }

      return argins;

    },

    submittedForm: async function(result) {

      this.saved = true;
      $("#myModal").modal('hide');

      this.formData.id = result.data.id;
      window.scrollTo(0, 0);

      console.log("result");
      console.log(result);

      var index = this.data.indexOf(this.item);

      if (index !== -1) {
        this.data[index] = result.data;
      }

      setTimeout(function() {
        $("#success-alert").hide();
      }, 5000);


    },
    //…
  }
});
