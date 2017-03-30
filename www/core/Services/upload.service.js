(function() {
  'use strict';
  // TODO:
  // 1. do event service

  angular
    .module('Services')
    .factory('uploadService', uploadService);

  var upload = {}

  uploadService.$inject = ['$log', '$q', '$http', 'Upload'];

  function uploadService($log, $q, $http, Upload) {

    var service = {
      uploadFile: uploadFile,
    };
    var timeout = 6000;


    // function autoRotate(url) {
    //   var split = url.split("/upload")
    //   split.splice(1, 0, "/upload/a_auto")
    //   return split.join('')
    // }

    // EXPORTED FUNCTIONS
    function uploadFile(file) {

      // Real upload
      return Upload.upload({
          url: "https://api.cloudinary.com/v1_1/jasons/image/upload",
          data: {
            upload_preset: "x7c8n8fe",
            tags: 'delivery',
            file: file,
            timeout: timeout
          }
        }, {})
        .then(function(response) {
          // response.data = autoRotate(response.data)
          console.log('hiiiiii', response)
          console.log('res here', response.url)
          return response
        })
        .catch(function(err) {
          console.log('ERRPR', err);
          throw err;
        })
    }

    // function uploadVideo(file) {
    //   return $cordovaFileTransfer.upload("https://api.cloudinary.com/v1_1/dqpfcybdo/video/upload", file.fullPath, {
    //     params: {
    //       fileKey: 'file',
    //       fileName: 'file',
    //       upload_preset: "rphbl8if",
    //       tags: 'myphotoalbum',
    //       file: file,
    //       timeout: timeout
    //     }
    //   }, true).then(
    //     function(response) {
    //       console.log('PATH RES', response);
    //       return JSON.parse(response.response);
    //     },
    //     function(err) {
    //       console.log('Error', err);
    //     },
    //     function(progress) {
    //       console.log('progrres', progress);
    //       return progress;
    //     }
    //   );
    // }

    // function fromPathUpload(imageData) {
    //   return $cordovaFileTransfer.upload("https://api.cloudinary.com/v1_1/dqpfcybdo/image/upload", imageData, {
    //     params: {
    //       fileKey: 'file',
    //       fileName: 'file',
    //       upload_preset: "rphbl8if",
    //       tags: 'myphotoalbum',

    //     }
    //   }, true).then(
    //     function(response) {
    //       console.log('PATH RES', response);
    //       return JSON.parse(response.response);
    //     },
    //     function(err) {
    //       console.log('Error', err);
    //     },
    //     function(progress) {
    //       console.log('progrres', progress);
    //       return progress;
    //     }
    //   );
    // }

    // function uploadFiles(arr) {
    //   // FAKE Upload
    //   var d = $q.defer();


    //   return $q.all(arr.map(function(imagedata) {
    //       console.log('IMAGEDATA', imagedata)
    //       var prom;
    //       if (imagedata.type === 'video') {
    //         prom = uploadVideo(imagedata);
    //       } else {
    //         prom = imagedata.path ? fromPathUpload(imagedata.path) : uploadFile(imagedata.src);
    //       }

    //       return prom.then(function(metaData) {
    //         console.log('FROM CLOUD', metaData);
    //         imagedata.src = metaData.url;
    //         imagedata.cloud = metaData;
    //         if (imagedata.type == 'video') {
    //           imagedata.thumbnail = metaData.url.replace('.mov', '.jpg');
    //         }
    //         return imagedata;
    //       });
    //     }))
    //     .then(function(responses) {
    //       console.log('POSTED', responses);
    //       return responses;
    //     })
    //     .catch(function(err) {
    //       console.log('ERROR Uploading', err);
    //     });
    // }

    return service;
  }
})();
