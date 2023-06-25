const permissions = require('./permissions');
const { name, description, version } = require('./app_info');

module.exports = {
  version,
  manifest_version: 3,
  name,
  description,
  permissions,
  minimum_chrome_version: '114',
  action: { default_title: 'Click to open panel' },
  side_panel: { default_path: 'assets/sidePanel.html' },
  host_permissions: ['*://*/*'],
  icons: { 128: 'assets/images/favicon.png' },
  background: { service_worker: 'background.js' },
  web_accessible_resources: [{
    resources: ['assets/**', 'content.js.map'],
    matches: ['<all_urls>']
  }],
  content_security_policy: {
    extension_pages: `
      default-src 'self';
      connect-src 'self' 
        https://apis.google.com
        https://www.googleapis.com
        https://securetoken.googleapis.com;
      style-src 'self' 'unsafe-inline'
        https://fonts.googleapis.com
        https://fonts.gstatic.com;
      font-src 'self'
        https://fonts.googleapis.com
        https://fonts.gstatic.com;
      img-src 'unsafe-inline' 'self' data: https://upload.wikimedia.org;
    `
  }
};
