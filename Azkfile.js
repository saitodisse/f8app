/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */
systems({
  mongodb: {
    image : { docker: 'mongo' },
    scalable: false,
    wait: 200,
    // Mounts folders to assigned paths
    mounts: {
      // to keep data between the executions
      '/data/db': persistent('mongodb-#{manifest.dir}'),
    },
    ports: {
      http: '27017',
    },
    http      : {
      // mongodb.azk.dev
      domains: [ '#{manifest.dir}-#{system.name}.#{azk.default_domain}' ],
    },
    export_envs        : {
      MONGODB_URI: 'mongodb://#{net.host}:#{net.port.data}/#{manifest.dir}_development',
    },
  },

});
