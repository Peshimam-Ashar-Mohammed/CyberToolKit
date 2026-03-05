const COMMON_SUBDOMAINS = [
  'www', 'mail', 'ftp', 'admin', 'api', 'dev', 'staging', 'test', 'beta',
  'app', 'portal', 'blog', 'shop', 'store', 'secure', 'vpn', 'remote',
  'webmail', 'smtp', 'pop', 'imap', 'ns1', 'ns2', 'dns', 'mx', 'cdn',
  'static', 'assets', 'media', 'img', 'images', 'files', 'download',
  'upload', 'backup', 'db', 'database', 'sql', 'mysql', 'postgres',
  'redis', 'mongo', 'elastic', 'search', 'auth', 'login', 'sso',
  'oauth', 'id', 'identity', 'dashboard', 'panel', 'cp', 'cpanel',
  'whm', 'plesk', 'jenkins', 'ci', 'cd', 'git', 'gitlab', 'github',
  'jira', 'confluence', 'wiki', 'docs', 'help', 'support', 'status',
  'monitor', 'grafana', 'prometheus', 'kibana', 'logs', 'sentry',
  'internal', 'intranet', 'extranet', 'proxy', 'gateway', 'lb',
  'node1', 'node2', 'web1', 'web2', 'srv', 'server', 'host',
  'cloud', 'aws', 'gcp', 'azure', 's3', 'storage', 'vault',
  'sandbox', 'demo', 'preview', 'uat', 'qa', 'prod', 'production',
  'old', 'new', 'v2', 'v3', 'legacy', 'archive',
  'api-v1', 'api-v2', 'rest', 'graphql', 'ws', 'websocket',
  'chat', 'meet', 'video', 'stream', 'live', 'rtmp',
  'm', 'mobile', 'wap', 'touch',
  'pay', 'payment', 'billing', 'invoice', 'crm', 'erp',
  'analytics', 'track', 'pixel', 'survey', 'form', 'forms',
];

const EXTENDED_SUBDOMAINS = [
  'cache', 'edge', 'origin', 'backend', 'frontend', 'client', 'service',
  'micro', 'lambda', 'function', 'worker', 'queue', 'broker', 'mq',
  'rabbitmq', 'kafka', 'consul', 'nomad', 'terraform', 'ansible',
  'docker', 'k8s', 'kubernetes', 'rancher', 'swarm', 'registry',
  'nexus', 'artifactory', 'sonar', 'lint', 'review', 'deploy',
  'release', 'canary', 'green', 'blue', 'a', 'b', 'alpha',
  'exchange', 'autodiscover', 'owa', 'outlook', 'calendar',
  'drive', 'share', 'sync', 'relay', 'report', 'reports',
  'ticket', 'tickets', 'issue', 'bug', 'feedback',
  'notify', 'notification', 'push', 'alert', 'alerts',
  'cms', 'wordpress', 'wp', 'drupal', 'magento', 'shopify',
  'api-gw', 'apigw', 'kong', 'nginx', 'apache', 'tomcat',
  'solr', 'sphinx', 'memcached', 'varnish', 'haproxy',
  'vpn2', 'ipsec', 'openvpn', 'wireguard', 'ssh', 'sftp', 'rsync',
  'nfs', 'smb', 'cifs', 'ldap', 'ad', 'kerberos', 'radius',
  'snmp', 'ntp', 'syslog', 'logstash', 'fluentd', 'telegraf',
  'zabbix', 'nagios', 'icinga', 'prtg', 'datadog', 'newrelic',
];

export function generateSubdomains(domain, size = 'medium') {
  if (!domain || !domain.includes('.')) return [];

  const cleaned = domain.trim().toLowerCase().replace(/^(https?:\/\/)/i, '').replace(/\/.*/, '');

  let wordlist;
  if (size === 'small') {
    wordlist = COMMON_SUBDOMAINS.slice(0, 30);
  } else if (size === 'large') {
    wordlist = [...COMMON_SUBDOMAINS, ...EXTENDED_SUBDOMAINS];
  } else {
    wordlist = COMMON_SUBDOMAINS;
  }

  return wordlist.map((sub) => `${sub}.${cleaned}`);
}
