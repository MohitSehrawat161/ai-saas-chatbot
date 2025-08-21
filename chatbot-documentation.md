# AI Chatbot Builder - User Documentation

Welcome to the AI Chatbot Builder! This comprehensive guide will walk you through creating, customizing, and deploying your own AI-powered chatbot for your website.

## 📋 Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Creating a Chatbot](#creating-a-chatbot)
- [Testing Your Chatbot](#testing-your-chatbot)
- [Deploying Your Chatbot](#deploying-your-chatbot)
- [Managing Your Chatbots](#managing-your-chatbots)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Introduction

The AI Chatbot Builder is a powerful tool that allows you to create custom AI chatbots for your website without any coding knowledge. You can:

- **Customize your bot's personality** and appearance
- **Upload knowledge base documents** (PDF, DOCX, CSV) to make your bot intelligent
- **Choose from pre-built templates** or create custom prompts
- **Deploy instantly** with a simple embed script
- **Test and manage** all your chatbots from one dashboard

Perfect for customer support, sales assistance, FAQ handling, and more!

---

## 🎯 Getting Started

### 1. Account Setup

1. **Navigate to the sign-up page** and create your account
2. **Verify your email** (if required)
3. **Log in** to your dashboard

### 2. Access Chatbot Creation

1. From your dashboard, click **"Create Bot"** or navigate to `/create-chatbot`
2. You'll be taken to the chatbot setup wizard with 4 simple steps

---

## 🤖 Creating a Chatbot

The chatbot creation process consists of 4 steps. Let's go through each one:

### Step 1: Bot Identity & Theme

In this step, you'll configure your bot's basic identity:

#### **Bot Description** (Required)
- Enter a clear description of what your bot does
- Example: "Helps customers with common questions and support issues"
- This helps users understand your bot's purpose

#### **Domain** (Required)
- Enter your website domain where the bot will be deployed
- Example: `support.example.com` or `help.mystore.com`
- This is used for bot identification and deployment

#### **Theme Color**
- Click the color picker to select your bot's primary color
- This color will be used for the chat interface and bot avatar border
- Choose a color that matches your website's branding

#### **Avatar Selection**
- Choose from a variety of pre-designed avatars
- Each avatar has a unique personality and appearance
- Select one that best represents your brand or bot's purpose

**💡 Tip:** Choose an avatar that aligns with your brand personality and target audience.

### Step 2: Bot Personality & Behavior

This step defines how your bot will interact with users:

#### **Bot Personality**
- **Professional & Helpful**: Formal and business-like communication
- **Friendly & Casual**: Warm and approachable tone
- **Technical & Precise**: Detailed and accurate responses
- **Custom**: Define your own personality (Premium feature)

#### **System Prompt Templates**
Choose from pre-built templates or customize your own:

**Customer Care Assistant**
- Professional, polite, and empathetic
- Focuses on customer support and problem resolution
- Maintains friendly and respectful tone

**Medical Assistant**
- Compassionate and knowledgeable about medical topics
- Provides clear, patient-friendly explanations
- Includes appropriate medical disclaimers

#### **Custom System Prompt**
- Edit the system prompt to match your specific needs
- Define your bot's role, tone, and focus areas
- Include specific instructions for handling different scenarios

**💡 Tip:** Be specific about your bot's limitations and when to escalate to human support.

### Step 3: Knowledge Base Integration

This is where you make your bot intelligent by uploading relevant documents:

#### **Supported File Types**
- **PDF**: Best for documents, manuals, and reports
- **DOCX**: Word documents and formatted text
- **CSV**: Structured data and FAQ lists

#### **File Upload Options**
1. **Drag & Drop**: Simply drag files into the upload area
2. **Click to Browse**: Click the upload area to select files from your computer

#### **File Requirements**
- **Free Plan**: 1 file, max 2MB
- **Premium Plans**: Multiple files, 2MB per file
- **Processing Time**: Files are automatically processed and indexed

#### **Best Practices for Knowledge Base**
- Use clear, well-structured documents
- Include common FAQs and questions
- Avoid image-only PDFs (text-based content works best)
- Organize information logically

**💡 Tip:** Start with your most frequently asked questions and expand over time.

### Step 4: Preview & Create

Review your bot configuration before final creation:

#### **Bot Summary**
- Verify bot name, description, and domain
- Check avatar and theme color
- Review system prompt and personality settings
- Confirm knowledge base files

#### **Create Your Bot**
- Click **"Create Chatbot"** to finalize
- Your bot will be processed and deployed automatically
- You'll be redirected to your bots dashboard

---

## 🧪 Testing Your Chatbot

### Testing Before Deployment

1. **From the Preview Step**: Review all settings before creating
2. **From My Bots Dashboard**: Use the "Test" button to preview your bot

### Testing After Deployment

1. **Copy the embed script** (see deployment section below)
2. **Add it to a test page** on your website
3. **Interact with your bot** to ensure it:
   - Responds appropriately to questions
   - Uses the correct tone and personality
   - Provides accurate information from your knowledge base
   - Handles edge cases gracefully

**💡 Tip:** Test with various question types and user scenarios to ensure comprehensive coverage.

---

## 🚀 Deploying Your Chatbot

### Getting Your Embed Script

1. **Go to "My Bots"** in your dashboard
2. **Find your chatbot** in the list
3. **Copy the embed script** that looks like this:

```html
<script 
src="https://effulgent-salamander-1c5c60.netlify.app/chatbot-embed.js" 
data-bot-id="YOUR_BOT_ID">
</script>
```

### Adding to Your Website

#### **HTML Websites**
1. Open your website's HTML file
2. Paste the script just before the closing `</body>` tag
3. Save and upload your website

#### **WordPress Sites**
1. Go to your WordPress dashboard
2. Navigate to **Appearance > Theme Editor**
3. Open `footer.php`
4. Paste the script before `</body>`
5. Click **Update File**

#### **Other Platforms**
- **Shopify**: Add to theme.liquid file
- **Wix**: Use HTML embed widget
- **Squarespace**: Use Code Block widget
- **Webflow**: Add to page settings

### Verification

After adding the script:
1. **Refresh your website**
2. **Look for the chat widget** (usually bottom-right corner)
3. **Test the chat functionality**
4. **Check mobile responsiveness**

**💡 Tip:** The chat widget will automatically appear on all pages where you've added the script.

---

## 📊 Managing Your Chatbots

### Dashboard Overview

Access all your chatbots from the **"My Bots"** section:

#### **Bot Status Indicators**
- 🟢 **Deployed**: Bot is active and ready to use
- 🟡 **Pending**: Bot is being processed

#### **Available Actions**
- **Test**: Preview your bot in action
- **Edit**: Modify bot settings (Premium feature)
- **Delete**: Remove bot permanently (Premium feature)
- **Copy Script**: Get the embed code

### Bot Management Features

#### **View Bot Details**
- Bot name and description
- Domain and deployment status
- Creation date and last modified
- Knowledge base file count

#### **Update Bot Settings**
- Modify system prompts
- Change personality settings
- Update knowledge base
- Adjust theme colors

#### **Monitor Performance**
- Track conversation metrics
- Analyze user interactions
- Identify improvement areas

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### **Chat Widget Not Appearing**
- **Check script placement**: Ensure it's before `</body>`
- **Verify bot ID**: Make sure the data-bot-id is correct
- **Clear browser cache**: Refresh with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- **Check console errors**: Look for JavaScript errors in browser developer tools

#### **Bot Not Responding**
- **Verify bot status**: Ensure bot shows "Deployed" status
- **Check knowledge base**: Confirm files were uploaded successfully
- **Test from dashboard**: Use the "Test" button to verify functionality
- **Check system prompt**: Ensure the prompt is properly configured

#### **File Upload Issues**
- **File size**: Ensure files are under 2MB (Free plan) or 2MB per file (Premium)
- **File format**: Use only PDF, DOCX, or CSV files
- **File content**: Avoid image-only PDFs
- **Browser compatibility**: Try a different browser if issues persist

#### **Performance Issues**
- **Knowledge base size**: Large files may take longer to process
- **Response time**: Complex queries may require more processing time
- **Browser resources**: Ensure adequate memory and processing power

### Getting Help

If you continue experiencing issues:

1. **Check the status page** for any service updates
2. **Review this documentation** for additional guidance
3. **Contact support** with specific error messages and steps to reproduce

---



## 🔒 Security & Privacy

### Data Protection

- **Secure file uploads** with encrypted transmission
- **Privacy compliance** with data protection regulations
- **User data handling** according to your privacy policy
- **Secure API endpoints** for all interactions

### Best Practices

- **Regular updates**: Keep your knowledge base current
- **Access control**: Limit who can modify bot settings
- **Monitoring**: Regularly review bot interactions
- **Compliance**: Ensure your bot follows relevant regulations

---

## 🎯 Advanced Features

### Premium Plan Benefits

- **Multiple knowledge base files**
- **Advanced customization options**
- **Analytics and reporting**
- **Priority support**
- **Custom integrations**

### Future Enhancements

- **Multi-language support**
- **Advanced AI models**
- **Custom branding options**
- **API access**
- **Webhook integrations**

---

## 🎉 Congratulations!

You've successfully created and deployed your AI chatbot! Here's what you've accomplished:

✅ **Customized bot personality** and appearance  
✅ **Integrated knowledge base** for intelligent responses  
✅ **Deployed to your website** with simple embed script  
✅ **Tested functionality** to ensure quality  
✅ **Learned management** techniques for ongoing success  

Your chatbot is now ready to:
- **Provide 24/7 customer support**
- **Answer frequently asked questions**
- **Engage visitors** and improve user experience
- **Reduce support workload** for your team
- **Collect valuable insights** about user needs

### Next Steps

1. **Monitor performance** and user interactions
2. **Update knowledge base** as needed
3. **Refine system prompts** based on usage patterns
4. **Create additional bots** for different purposes
5. **Explore advanced features** as your needs grow

---

**Happy Chatbot Building! 🚀**

For additional support or questions, please refer to the troubleshooting section or contact our support team.

---

*Last updated: August 2025*  
*Version: 1.0*
