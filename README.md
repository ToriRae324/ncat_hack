# ncat_hack

Background

Cisco DNA-Center is the evolution of how users will interact with their networks.  With an intuitive user interface coupled with a robust DNA-C API, interactions is limited only by human imagination of what's possible.


Challenge

The NC A&T hack-a-thon challenge is to use Cisco DNA-Center API in conjunction with other available open-source APIs to accomplish the following tasks:


(1) Use a twitter account to 'tweet' an hourly network status report.  The tweet should be brief and convey only the key points, for example:

Date/Time: The network is up!  No issue detected

Date/Time: The network is up!  (2) issues detected within the past hour


(2) Use a twitter account to 'tweet' an alert when a network device has a problem.  This tweet should also be brief.  An example follows:

Date/Time: ALERT: asr1001-x-.abc.inc is experiencing high CPU utilization


(3) Add BOT functionality to the twitter account to allow network users to interact with DNA-Center using natural language.  Using the API experience learned from tasks (1) and (2) the contestants should feel free to add functionality based on available time remaining.  Some examples might include:

Q: How long has the network been up?

A: The longest device uptime is (days/hours) while the shortest is (days/hours)


Q: What devices are there?

A: The active devices are ASR-1000-X (1-device), CAT-9K (2-devices), CS-3850 (1-device)


Q: What devices are have outdated software?

A: The CAT9K[16.6.1] is outdated


Detailed Information for Contestants

DNA-Center sandbox
https://sandboxdnac.cisco.com
User=devnetuser Pass=Cisco123!
Example API Usage
https://github.com/bigevilbeard/dnac-device-info
DNA-Center developer network
https://developer.cisco.com/dnacenter/