const SAMPLE_NOTE =
  "TravelForum is a student project built at Telerik Academy. This page is a sample and is not a legally binding document.";

export const INFO_PAGES = [
  {
    key: "about",
    path: "/about",
    label: "About",
    title: "About TravelForum",
    intro:
      "TravelForum is a community where travelers share honest experiences, ask questions and help each other plan better trips.",
    sections: [
      {
        heading: "Why we built it",
        body: "Travel advice online is often sponsored, outdated or written by people who have never been there. We wanted a place where the answers come from real travelers who have walked the same streets and taken the same buses.",
      },
      {
        heading: "What you can do here",
        body: "Write about the places you have visited, ask the community before your next trip, like the posts that helped you and join the conversation in the comments. You get a notification as soon as someone likes or replies to your post.",
      },
      {
        heading: "Who is behind it",
        body: "TravelForum was designed and built by Kristela and George as a team project at Telerik Academy, using React, Chakra UI and Supabase.",
      },
    ],
  },
  {
    key: "guidelines",
    path: "/guidelines",
    label: "Community Guidelines",
    title: "Community Guidelines",
    intro:
      "TravelForum works because people trust what they read here. These guidelines help keep it that way.",
    sections: [
      {
        heading: "Share real experiences",
        body: "Write about places you have actually been to. If you are sharing something you heard from someone else, say so.",
      },
      {
        heading: "Be kind and respectful",
        body: "Disagree with ideas, not with people. No insults, harassment or hate speech toward anyone, including other cultures and countries.",
      },
      {
        heading: "Keep it useful",
        body: "Give your posts a clear title and enough detail to help others. Avoid spam, advertising and posting the same thing more than once.",
      },
      {
        heading: "Stay safe",
        body: "Do not share personal details like your home address, phone number or travel documents in public posts or comments.",
      },
      {
        heading: "What happens if the rules are broken",
        body: "Posts and comments that break these guidelines can be removed, and accounts that keep breaking them can be blocked from posting.",
      },
    ],
  },
  {
    key: "privacy",
    path: "/privacy",
    label: "Privacy",
    title: "Privacy Policy",
    intro:
      "This page explains what information TravelForum collects and how it is used.",
    note: SAMPLE_NOTE,
    sections: [
      {
        heading: "What we collect",
        body: "When you create an account, we store your name, username, email address and phone number. We also store the posts, photos, comments and likes you add to the forum.",
      },
      {
        heading: "How we use it",
        body: "Your information is used only to run the forum: to show your profile and posts, to let other users interact with them and to send you notifications about activity on your posts.",
      },
      {
        heading: "Where it is stored",
        body: "All data is stored with Supabase. Access rules in the database make sure users can only change their own content.",
      },
      {
        heading: "What we never do",
        body: "We do not sell your data or share it with advertisers.",
      },
      {
        heading: "Your choices",
        body: "You can edit your profile, and edit or delete your own posts and comments at any time.",
      },
    ],
  },
  {
    key: "terms",
    path: "/terms",
    label: "Terms",
    title: "Terms of Use",
    intro: "By using TravelForum, you agree to these terms.",
    note: SAMPLE_NOTE,
    sections: [
      {
        heading: "Your account",
        body: "You are responsible for keeping your login details safe and for everything that is posted from your account.",
      },
      {
        heading: "Your content",
        body: "You keep the rights to what you post. By posting, you allow TravelForum to show it to other users of the forum.",
      },
      {
        heading: "Following the rules",
        body: "Using TravelForum means following the Community Guidelines. Content or accounts that break them can be removed or blocked.",
      },
      {
        heading: "Travel advice",
        body: "Posts are written by community members and reflect their personal experience. Always check official sources for visas, safety and health requirements before you travel.",
      },
      {
        heading: "Changes",
        body: "These terms may change as the forum grows. The latest version will always be on this page.",
      },
    ],
  },
];
