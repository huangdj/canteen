(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/index.js?!./resources/js/components/bag/Edit.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_babel-loader@8.0.6@babel-loader/lib??ref--4-0!./node_modules/_vue-loader@15.8.3@vue-loader/lib??vue-loader-options!./resources/js/components/bag/Edit.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      bag: {
        name: '',
        price: '',
        photo_id: ''
      },
      imageUrl: '',
      rules: {
        name: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }, {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入单价',
          trigger: 'blur'
        }],
        photo_id: [{
          required: true,
          message: '请上传图片',
          trigger: 'blur'
        }]
      }
    };
  },
  created: function created() {
    var _this = this;

    var id = this.$route.params.id;
    axios.get("/admin/bags/".concat(id)).then(function (res) {
      // console.log(res)
      _this.bag = res.data.bag;
      _this.imageUrl = res.data.bag.photo.image;
    });
  },
  methods: {
    updateForm: function updateForm(formName) {
      var _this2 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {
          axios.put("/admin/bags/".concat(_this2.bag.id), _this2.bag).then(function (res) {
            _this2.$notify({
              title: '成功',
              message: '编辑购物袋成功',
              type: 'success'
            });

            _this2.$router.push({
              name: 'bags'
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm: function resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeAvatarUpload: function beforeAvatarUpload(file) {
      var isJPG = file.type === 'image/jpeg' || 'image/png';
      var isLt3M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }

      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }

      return isJPG && isLt3M;
    },
    handleAvatarSuccess: function handleAvatarSuccess(res, file) {
      // console.log(res);
      this.imageUrl = res.image;
      this.bag.photo_id = res.photo_id;
    }
  }
});

/***/ }),

/***/ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/index.js?!./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.1@css-loader??ref--6-1!./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--6-2!./node_modules/_vue-loader@15.8.3@vue-loader/lib??vue-loader-options!./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js */ "./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\n    border-color: #409EFF;\n}\n.avatar-uploader-icon {\n    font-size: 28px;\n    color: #8c939d;\n    width: 178px;\n    height: 178px;\n    line-height: 178px;\n    text-align: center;\n}\n.avatar {\n    width: 178px;\n    height: 178px;\n    display: block;\n}\n.demo-ruleForm {\n    margin: 30px 0;\n}\n.hengxian {\n    margin-top: 20px;\n    border-top: 1px solid #eeeeee;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/_style-loader@0.23.1@style-loader/index.js!./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/index.js?!./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_style-loader@0.23.1@style-loader!./node_modules/_css-loader@1.0.1@css-loader??ref--6-1!./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--6-2!./node_modules/_vue-loader@15.8.3@vue-loader/lib??vue-loader-options!./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/_css-loader@1.0.1@css-loader??ref--6-1!../../../../node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--6-2!../../../../node_modules/_vue-loader@15.8.3@vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=style&index=0&lang=css& */ "./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/index.js?!./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js */ "./node_modules/_style-loader@0.23.1@style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/index.js?!./resources/js/components/bag/Edit.vue?vue&type=template&id=52816c9c&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.8.3@vue-loader/lib??vue-loader-options!./resources/js/components/bag/Edit.vue?vue&type=template&id=52816c9c& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-breadcrumb",
        { attrs: { separator: "/" } },
        [
          _c("el-breadcrumb-item", { attrs: { to: { path: "/" } } }, [
            _vm._v("首页")
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [
            _c("a", { attrs: { href: "/bags" } }, [_vm._v("购物袋列表")])
          ]),
          _vm._v(" "),
          _c("el-breadcrumb-item", [_vm._v("编辑购物袋")])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "hengxian" }),
      _vm._v(" "),
      _c(
        "el-form",
        {
          ref: "ruleForm",
          staticClass: "demo-ruleForm",
          attrs: { model: _vm.bag, rules: _vm.rules, "label-width": "100px" }
        },
        [
          _c(
            "el-form-item",
            { attrs: { label: "名称", prop: "name" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.bag.name,
                  callback: function($$v) {
                    _vm.$set(_vm.bag, "name", $$v)
                  },
                  expression: "bag.name"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "缩略图", prop: "photo_id" } },
            [
              _c(
                "el-upload",
                {
                  staticClass: "avatar-uploader",
                  attrs: {
                    action: "/admin/photos",
                    "show-file-list": false,
                    "on-success": _vm.handleAvatarSuccess,
                    "before-upload": _vm.beforeAvatarUpload
                  }
                },
                [
                  _vm.imageUrl
                    ? _c("img", {
                        staticClass: "avatar",
                        attrs: { src: _vm.imageUrl }
                      })
                    : _c("i", {
                        staticClass: "el-icon-plus avatar-uploader-icon"
                      })
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "单价", prop: "price" } },
            [
              _c("el-input", {
                model: {
                  value: _vm.bag.price,
                  callback: function($$v) {
                    _vm.$set(_vm.bag, "price", $$v)
                  },
                  expression: "bag.price"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _c(
                "el-button",
                {
                  attrs: { type: "primary" },
                  on: {
                    click: function($event) {
                      return _vm.updateForm("ruleForm")
                    }
                  }
                },
                [_vm._v("立即创建")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  on: {
                    click: function($event) {
                      return _vm.resetForm("ruleForm")
                    }
                  }
                },
                [_vm._v("重置")]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/bag/Edit.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/bag/Edit.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_52816c9c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=52816c9c& */ "./resources/js/components/bag/Edit.vue?vue&type=template&id=52816c9c&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./resources/js/components/bag/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Edit.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_15_8_3_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/_vue-loader@15.8.3@vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/_vue-loader@15.8.3@vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_15_8_3_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_52816c9c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_52816c9c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/bag/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/bag/Edit.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/components/bag/Edit.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_8_0_6_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/_babel-loader@8.0.6@babel-loader/lib??ref--4-0!../../../../node_modules/_vue-loader@15.8.3@vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/_babel-loader@8.0.6@babel-loader/lib/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/index.js?!./resources/js/components/bag/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_8_0_6_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_0_23_1_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_ref_6_1_node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/_style-loader@0.23.1@style-loader!../../../../node_modules/_css-loader@1.0.1@css-loader??ref--6-1!../../../../node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/_postcss-loader@3.0.0@postcss-loader/src??ref--6-2!../../../../node_modules/_vue-loader@15.8.3@vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=style&index=0&lang=css& */ "./node_modules/_style-loader@0.23.1@style-loader/index.js!./node_modules/_css-loader@1.0.1@css-loader/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_postcss-loader@3.0.0@postcss-loader/src/index.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/index.js?!./resources/js/components/bag/Edit.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_0_23_1_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_ref_6_1_node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_0_23_1_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_ref_6_1_node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_0_23_1_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_ref_6_1_node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_0_23_1_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_ref_6_1_node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_0_23_1_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_ref_6_1_node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_3_0_0_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/bag/Edit.vue?vue&type=template&id=52816c9c&":
/*!*****************************************************************************!*\
  !*** ./resources/js/components/bag/Edit.vue?vue&type=template&id=52816c9c& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_52816c9c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/_vue-loader@15.8.3@vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=52816c9c& */ "./node_modules/_vue-loader@15.8.3@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_vue-loader@15.8.3@vue-loader/lib/index.js?!./resources/js/components/bag/Edit.vue?vue&type=template&id=52816c9c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_52816c9c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_15_8_3_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_15_8_3_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_52816c9c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);