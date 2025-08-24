import type { EmailSample } from '../types';

export const sampleEmails: EmailSample[] = [
  {
    id: '1',
    title: 'Professional Business Inquiry',
    category: 'business',
    content: `Dear Mr. Johnson,

I hope this email finds you well. I am writing to inquire about the possibility of scheduling a meeting to discuss our upcoming project collaboration.

Our team has been impressed with your company's recent work in the sustainable technology sector, and we believe there could be significant synergies between our organizations.

Would you be available for a call next week? I am flexible with timing and can accommodate your schedule.

Looking forward to your response.

Best regards,
Sarah Mitchell
Project Manager
GreenTech Solutions`
  },
  {
    id: '2',
    title: 'Customer Complaint',
    category: 'complaint',
    content: `To Whom It May Concern,

I am extremely disappointed with the service I received yesterday. The delivery was not only 3 hours late, but the package was also damaged when it arrived.

This is completely unacceptable, especially considering the premium price I paid for expedited shipping. I have been a loyal customer for over 5 years, and this experience has left me questioning whether I should continue doing business with your company.

I demand a full refund and an explanation for this poor service. If this matter is not resolved immediately, I will be forced to escalate this complaint and share my negative experience on social media.

I expect a response within 24 hours.

Frustrated Customer,
Robert Chen`
  },
  {
    id: '3',
    title: 'Thank You Note',
    category: 'appreciation',
    content: `Hi Jennifer,

I just wanted to take a moment to express my heartfelt gratitude for all your help during the conference last week. Your presentation was absolutely fantastic, and the insights you shared were incredibly valuable.

Thanks to your guidance, I was able to connect with several potential clients and learn about innovative approaches I hadn't considered before. You truly went above and beyond to make the event successful.

I'm excited about the possibility of collaborating on future projects and would love to grab coffee sometime to discuss ideas further.

With sincere appreciation,
Amanda Rodriguez
Marketing Director`
  },
  {
    id: '4',
    title: 'Technical Support Request',
    category: 'inquiry',
    content: `Hello Support Team,

I'm experiencing some technical difficulties with your software and could use some assistance. When I try to export data from the analytics dashboard, the system gives me an error message saying "Export failed - please try again later."

I've tried refreshing the page and logging out and back in, but the problem persists. This is affecting my ability to prepare reports for tomorrow's board meeting.

Could someone please help me resolve this issue as soon as possible? I'm using Chrome browser version 115.0.5790.110 on Windows 11.

My account details:
- Username: j.wilson@techcorp.com
- Plan: Professional
- Last successful export: July 30th

Thank you for your assistance.

Best,
James Wilson
Data Analyst
TechCorp Industries`
  },
  {
    id: '5',
    title: 'Friendly Team Update',
    category: 'casual',
    content: `Hey team! 👋

Hope everyone's having an awesome week! Just wanted to give you all a quick update on the marketing campaign we launched on Monday.

The numbers are looking pretty amazing so far - we're already at 150% of our projected engagement rate! 🎉 I think the new creative direction is really resonating with our audience.

Also, don't forget about our team lunch this Friday at that new pizza place downtown. Can't wait to celebrate our wins together!

Let me know if you have any questions. Keep being awesome! 

Cheers,
Alex
Marketing Team Lead`
  },
  {
    id: '6',
    title: 'Urgent Project Deadline',
    category: 'urgent',
    content: `Subject: URGENT - Project Deadline Moved Up

Hi everyone,

I just received word from the client that they need to move up our project deadline by two weeks. I know this is short notice, but we need to adapt quickly.

The new deadline is now August 15th instead of August 30th. This means we need to accelerate our timeline significantly.

I need everyone to:
1. Review your current tasks and identify what can be fast-tracked
2. Let me know if you need additional resources
3. Attend an emergency team meeting tomorrow at 9 AM

I understand this puts pressure on everyone, but I'm confident we can deliver quality work on time if we work together.

Please respond by EOD today with your availability and concerns.

Thanks,
David Park
Project Manager`
  },
  {
    id: '7',
    title: 'Gentle Follow-up',
    category: 'follow-up',
    content: `Hi Maria,

I hope you're doing well! I wanted to follow up on our conversation from last week about the potential partnership opportunity.

I know you mentioned you'd need some time to discuss this with your team, and I completely understand that these decisions take time. I just wanted to check in and see if you had any initial thoughts or questions I could help address.

No pressure at all - I'm happy to wait until you're ready. I just wanted to keep the lines of communication open.

If it would be helpful, I'd be glad to provide additional information about our services or set up a brief call with our technical team to answer any specific questions.

Looking forward to hearing from you when the timing is right.

Best wishes,
Lisa Chen
Business Development Manager`
  },
  {
    id: '8',
    title: 'Enthusiastic Announcement',
    category: 'announcement',
    content: `🚀 EXCITING NEWS ALERT! 🚀

Dear valued customers and partners,

We are absolutely THRILLED to announce the launch of our revolutionary new product line! After months of hard work and innovation, we're finally ready to share something truly special with you.

Introducing SmartFlow Pro - the game-changing solution that will transform how you manage your workflow! Here's what makes it incredible:

✨ 300% faster processing speeds
✨ AI-powered automation features
✨ Seamless integration with existing tools
✨ 24/7 customer support

Early bird pricing is available for the next 48 hours only! Don't miss out on this amazing opportunity to be among the first to experience the future of productivity.

Visit our website or call us immediately to secure your spot!

We can't wait for you to experience the magic!

With boundless excitement,
The Innovation Team
FutureTech Solutions`
  }
];

export const mockAnalysisResults = {
  '1': {
    id: '1',
    emailContent: sampleEmails[0].content,
    timestamp: new Date(),
    overallSentiment: 'positive' as const,
    confidence: 0.85,
    tones: {
      positive: 75,
      negative: 5,
      neutral: 20,
      angry: 2,
      enthusiastic: 65,
      formal: 85,
      informal: 15,
      analytical: 70,
      confident: 80,
      tentative: 20
    },
    suggestions: [
      'The email has a professional and positive tone overall',
      'Consider adding specific agenda items for the proposed meeting',
      'The enthusiasm level is appropriate for business communication'
    ],
    keywords: ['professional', 'collaboration', 'synergies', 'impressed', 'flexible']
  },
  '2': {
    id: '2',
    emailContent: sampleEmails[1].content,
    timestamp: new Date(),
    overallSentiment: 'negative' as const,
    confidence: 0.95,
    tones: {
      positive: 5,
      negative: 90,
      neutral: 5,
      angry: 85,
      enthusiastic: 10,
      formal: 60,
      informal: 40,
      analytical: 30,
      confident: 70,
      tentative: 10
    },
    suggestions: [
      'The tone is very negative and aggressive - consider softening the language',
      'Focus on solution-seeking rather than blame',
      'Remove ultimatums and threats for better resolution',
      'Add more specific details about desired outcomes'
    ],
    keywords: ['disappointed', 'unacceptable', 'frustrated', 'demand', 'complaint']
  },
  '3': {
    id: '3',
    emailContent: sampleEmails[2].content,
    timestamp: new Date(),
    overallSentiment: 'positive' as const,
    confidence: 0.92,
    tones: {
      positive: 95,
      negative: 2,
      neutral: 3,
      angry: 1,
      enthusiastic: 88,
      formal: 40,
      informal: 60,
      analytical: 25,
      confident: 85,
      tentative: 15
    },
    suggestions: [
      'Excellent use of gratitude and appreciation',
      'The warm and genuine tone builds strong relationships',
      'Consider being more specific about future collaboration ideas'
    ],
    keywords: ['gratitude', 'fantastic', 'valuable', 'appreciation', 'excited']
  },
  '4': {
    id: '4',
    emailContent: sampleEmails[3].content,
    timestamp: new Date(),
    overallSentiment: 'neutral' as const,
    confidence: 0.78,
    tones: {
      positive: 20,
      negative: 25,
      neutral: 55,
      angry: 15,
      enthusiastic: 10,
      formal: 75,
      informal: 25,
      analytical: 80,
      confident: 60,
      tentative: 40
    },
    suggestions: [
      'Good technical detail and clear problem description',
      'Professional tone appropriate for support requests',
      'Consider adding urgency level for better prioritization'
    ],
    keywords: ['technical', 'assistance', 'error', 'support', 'resolution']
  },
  '5': {
    id: '5',
    emailContent: sampleEmails[4].content,
    timestamp: new Date(),
    overallSentiment: 'positive' as const,
    confidence: 0.91,
    tones: {
      positive: 90,
      negative: 3,
      neutral: 7,
      angry: 2,
      enthusiastic: 95,
      formal: 20,
      informal: 80,
      analytical: 40,
      confident: 88,
      tentative: 12
    },
    suggestions: [
      'Great use of emojis and casual tone for team communication',
      'Enthusiasm is contagious and motivating',
      'Perfect balance of celebration and information sharing'
    ],
    keywords: ['awesome', 'amazing', 'celebrate', 'team', 'wins']
  },
  '6': {
    id: '6',
    emailContent: sampleEmails[5].content,
    timestamp: new Date(),
    overallSentiment: 'neutral' as const,
    confidence: 0.82,
    tones: {
      positive: 30,
      negative: 40,
      neutral: 30,
      angry: 20,
      enthusiastic: 25,
      formal: 70,
      informal: 30,
      analytical: 85,
      confident: 75,
      tentative: 25
    },
    suggestions: [
      'Good balance of urgency and understanding',
      'Clear action items help team focus',
      'Consider acknowledging the inconvenience more explicitly',
      'Add contingency plans for risk mitigation'
    ],
    keywords: ['urgent', 'deadline', 'accelerate', 'pressure', 'confident']
  },
  '7': {
    id: '7',
    emailContent: sampleEmails[6].content,
    timestamp: new Date(),
    overallSentiment: 'positive' as const,
    confidence: 0.87,
    tones: {
      positive: 80,
      negative: 5,
      neutral: 15,
      angry: 2,
      enthusiastic: 45,
      formal: 65,
      informal: 35,
      analytical: 35,
      confident: 70,
      tentative: 30
    },
    suggestions: [
      'Excellent use of patience and understanding',
      'Non-pressuring approach shows professionalism',
      'Consider offering a specific timeline for next follow-up'
    ],
    keywords: ['follow-up', 'patience', 'understanding', 'communication', 'timing']
  },
  '8': {
    id: '8',
    emailContent: sampleEmails[7].content,
    timestamp: new Date(),
    overallSentiment: 'positive' as const,
    confidence: 0.96,
    tones: {
      positive: 98,
      negative: 1,
      neutral: 1,
      angry: 0,
      enthusiastic: 99,
      formal: 45,
      informal: 55,
      analytical: 20,
      confident: 95,
      tentative: 5
    },
    suggestions: [
      'Extremely high enthusiasm may overwhelm some readers',
      'Consider toning down superlatives for broader appeal',
      'Good use of bullet points for feature highlights',
      'Strong call-to-action with urgency'
    ],
    keywords: ['thrilled', 'revolutionary', 'incredible', 'amazing', 'excitement']
  }
};
