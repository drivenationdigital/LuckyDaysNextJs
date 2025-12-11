"use client";

const faqs = [
    {
        id: 1,
        title: "Where can I find my ticket numbers?",
        category: "Popular FAQ",
        content: `
      <p>Your numbers are allocated after checkout, shortly after payment. They will be displayed in 3 locations:</p>
      <ul>
        <li>On the order success page</li>
        <li>In your My Account area here: <a href="https://www.luckydaycompetitions.com/my-account">https://www.luckydaycompetitions.com/my-account</a></li>
        <li>Sent to you via email</li>
      </ul>
      <p>Emails are usually sent a few minutes after your order has been successfully paid. If you have not received it, please check your junk/spam.</p>
    `
    },
    {
        id: 2,
        title: "I have not received my ticket numbers?",
        category: "Popular FAQ",
        content: `
      <p>Ticket numbers are allocated immediately after payment, and are usually available to see in 3 locations:</p>
      <ul>
        <li>On the order success page</li>
        <li>In your My Account area here: <a href="https://www.luckydaycompetitions.com/my-account">https://www.luckydaycompetitions.com/my-account</a></li>
        <li>Sent to you via email</li>
      </ul>
      <p>If you are struggling to find them or think there may have been a problem, please contact our support team via <a href="mailto:info@luckydaycompetitions.com">info@luckydaycompetitions.com</a></p>
    `
    },
    {
        id: 3,
        title: "How do I change my account details or password?",
        category: "Popular FAQ",
        content: `
      <p>You can manage your personal details and password in your account area here:</p>
      <p><a href="https://www.luckydaycompetitions.com/my-account/edit-account/">https://www.luckydaycompetitions.com/my-account/edit-account/</a></p>
    `
    },
    {
        id: 4,
        title: "How do I reset my password if I can't access my account?",
        category: "Popular FAQ",
        content: `
      <p>To recover a lost password, please click here: <a href="https://www.luckydaycompetitions.com/my-account/lost-password/">https://www.luckydaycompetitions.com/my-account/lost-password/</a></p>
      <p>You will receive an email with instructions on how to complete the password reset.</p>
    `
    },
    {
        id: 5,
        title: "When is the live draw?",
        category: "Popular FAQ",
        content: `
      <p>Live draws take place every Monday, Wednesday and Friday. Competitions generally close at 11PM, with the live draw taking place from 11.15PM onwards, on our Facebook page: <a href="https://www.facebook.com/LuckyDayCompetitions">https://www.facebook.com/LuckyDayCompetitions</a>.</p>
      <p>Sometimes we will add different draw dates/times for weekly cash drops, bigger prizes and holidays/special occasions. Please check the end/date time listed on each competition.</p>
      <p>For Instant Wins and Auto Draws, these will be drawn and notified via email.</p>
    `
    },
    {
        id: 6,
        title: "What competitions/prizes do you have available?",
        category: "",
        content: `
      <p>All active prizes are listed on this website. You can find out more details by visiting our All Competitions page: <a href="https://www.luckydaycompetitions.com/all-competitions/">https://www.luckydaycompetitions.com/all-competitions/</a></p>
      <p>We reserve the right to offer an alternative prize of an equal or higher value if the prize is unavailable for any reason.</p>
      <p>Cash alternatives are usually available for all prizes.</p>
    `
    },
    {
        id: 7,
        title: "How do I enter a competition?",
        category: "",
        content: `
      <p>To enter, please follow the steps below:</p>
      <ul>
        <li>Sign up for a free account or log into an existing account here: <a href="https://www.luckydaycompetitions.com/my-account/">https://www.luckydaycompetitions.com/my-account/</a></li>
        <li>On our homepage and All Competitions page, you will see a list of active competitions, each with a button which says “Enter now”. Click that and you will be taken to the entry page.</li>
        <li>Select the number of tickets you would like to buy, proceed to checkout, fill out your details and enter your payment details.</li>
        <li>You will need to tick the box to confirm that you accept our terms and conditions. You can read them here: <a href="https://www.luckydaycompetitions.com/terms-and-conditions/">https://www.luckydaycompetitions.com/terms-and-conditions/</a></li>
        <li>Once paid, money will be taken and your ticket numbers will be provided.</li>
      </ul>
    `
    },
    {
        id: 8,
        title: "How long are competitions open for?",
        category: "",
        content: `
        <p>The opening and closing date of the competitions are stated on the website, along with a countdown timer.</p>
        <p>Competition end dates are never extended. We may bring the draw forward, if it has sold out ahead of time.</p>
        <p>If we have to change either of these dates for any reason, we will update the website accordingly. We will only delay the date if we have to for reasons outside of our control.</p>
    `
    },
    {
        id: 9,
        title: "Can anyone enter the competition?",
        category: "",
        content: `
            <p>The competition is open to individuals who are 18 years or older and live in one of our designated catchment areas.</p>
            <p>We do not except entries from anyone outside of these areas as the laws for running competitions vary. This competition has been organised to comply with the laws of England.</p>
            <p>Also, you cannot enter this competition if you are a relative of any of our suppliers.</p>
    `
    },
    {
        id: 10,
        title: "Can I enter more than once?",
        category: "",
        content: `<p>You can enter the competition as many times as you wish. Your entries may be restricted if we reach the maximum number of entries.</p>
        <p>Whilst this isn’t gambling, we still urge you to keep this fun and not spend more than you can afford.</p>`
    },
    {
        id: 11,
        title: "What are the competition rules?",
        category: "",
        content: `<ul>
            <li>By entering this competition, you have confirmed that you have read and agree to our&nbsp;terms and conditions: <a href="https://www.luckydaycompetitions.com/terms-and-conditions/">https://www.luckydaycompetitions.com/terms-and-conditions/</a></li>
            <li>For free entry method see our&nbsp;terms and conditions 3.10: <a href="https://www.luckydaycompetitions.com/terms-and-conditions/">https://www.luckydaycompetitions.com/terms-and-conditions/</a></li>
            <li>We are a certified and verified company that offers a secure service that protects your privacy to GDPR Regulations</li>
            <li>Our fully compliant 3D secure 2 Authentication system reduces fraud and keeps our customers data safe whilst making payment on our website</li>
            <li><strong>For total transparency</strong>, we video all draws LIVE on our&nbsp;Facebook page, using Google’s random number generator:<a href="https://www.facebook.com/luckydaycompetitions">https://www.facebook.com/luckydaycompetitions</a></li>
            <li>Entering the competition and successfully answering the question does not guarantee a prize, only entry into the LIVE draw.</li>
            <li>There will only be one winner per competition unless otherwise stated</li>
            </ul>`
    }, {
        id: 12,
        title: "What happens when a competition sells out?",
        category: "",
        content: `<p>If a competition sells out ahead of the draw date, you will no longer be able to buy tickets for that competition.</p>
        <p>It will still be drawn on it’s designated draw date, unless we decide to pull it forward into an earlier draw. Information on the draw date can be found on the product page.</p>    `
    },
    {
        id: 13,
        title: "What happens if all the tickets are not sold?",
        content: `
      <p>The draws will go ahead as planned, on the listed draw date. We believe it is unfair for you to have to wait any longer, and we can’t wait to get the next prize.</p>
    `
    },
    {
        id: 14,
        title: "How do you pick the winner - will I know if I've won?",
        content: `
      <p><strong>For Live Draws</strong> – We select a winners using Google’s random number generator, via live draws on our Facebook page here: <a href="https://www.facebook.com/LuckyDayCompetitions">https://www.facebook.com/LuckyDayCompetitions</a>.</p>
      <p>We will notify the winner via telephone or email within 7 days...</p>
      <p><strong>For Instant Wins</strong> – Our website will notify you immediately...</p>
      <p><strong>For Auto Draws</strong> – Our website will select and notify the winner automatically...</p>
    `
    },
    {
        id: 15,
        title: "If I win, how do I claim and collect my prize?",
        content: `
      <p>All prizes can be collected from our business premises. Mon – Fri 9am-5pm.</p>
      <p>All prizes will be delivered free of charge to mainland UK and Ireland...</p>
    `
    },
    {
        id: 16,
        title: "Can I sell the prize if I don’t want it?",
        content: `
      <p>If you are the winner, the prize will be yours. You can do what ever you wish with it, including selling it.</p>
      <p>Cash alternatives are usually available for all prizes.</p>
    `
    },
    {
        id: 17,
        title: "If I win, do I have to participate in promotional exercises?",
        content: `
      <p>No, this is not compulsory. However, with your permission, we would love to share your excitement on our website and social media pages.</p>
      <p>Even if you do not want to participate in any promotional exercises, we may have to provide your details to the Advertising Standards Authority to prove we have administered the competition and awarded the prize fairly.</p>
    `
    },
    {
        id: 18,
        title: "What are my chances of winning?",
        content: `
      <p>The maximum number of entries is stated on each competition so your chances of winning will vary from competition to competition.</p>
      <p>As an example, if entries are capped at a maximum of 3000, this means that if you purchase 1 entry and get the answer correct, your chances of winning will be no worse than 1 in 3,000.</p>
    `
    },
    {
        id: 19,
        title: "Can I get a refund?",
        content: `
      <p>Unfortunately, refunds are not available for any competition. This includes if you have been disqualified from the competition for any reason.</p>
    `
    },
    {
        id: 20,
        title: "Why am I receiving communications from Lucky Day Competitions?",
        content: `
      <p>We send out SMS and emails to all customers who register with us as part of our core service.</p>
      <p>You can opt out at any time. Details on how to opt out are contained within the message you have received.</p>
    `
    },
    {
        id: 21,
        title: "How do you use my personal data?",
        content: `
      <p>We need to use your data to administer the competition and award prizes. We do not use your data for any other purpose.</p>
      <p>We do not share your data with any third parties unless this is necessary for administering the competition.</p>
      <p>Full details of how we use your data are included in our Privacy Policy which you can read here: <a href="https://www.luckydaycompetitions.com/privacy-policy/">https://www.luckydaycompetitions.com/privacy-policy/</a></p>
      <p>If you are the winner, we may have to share your details with the Advertising Standards Authority to confirm that we have administered the competition and awarded the prizes fairly.</p>
      <p>You have the right to opt out from us using your data at any time. However, if you do ask us to remove your details from our database prior to the closing date, you will be withdrawing from the competition. You will not be entitled to a refund of any entry fees you have paid.</p>
    `
    },
    {
        id: 22,
        title: "How do I know the competition is legitimate?",
        content: `
      <p>Lucky Day Competitions have been in operation since 2019 and have given away over £70 million in cash and prizes to date!</p>
      <p>If you would like to see a list of our happy winners, please visit our Past Winners page here: <a href="https://www.luckydaycompetitions.com/past-winners/">https://www.luckydaycompetitions.com/past-winners/</a></p>
    `
    },
    {
        id: 23,
        title: "Is there a free entry route?",
        content: `
      <p>Yes, there is also a free entry route available. To enter for free, send your name, address, telephone number, email address to us at the following address:</p>
      <p>72 Tievecrom Road, Forkhill, Newry, Co. Down, BT35 9RX</p>
      <p>Entries must be submitted via first class or second class post. Bulk entries are not accepted and if received will count as one single entry.</p>
      <p>If you wish to enter for free multiple times you may do so up to any limit placed on the number of entries. Each free entry must be submitted separately stating acceptance of our terms and conditions.</p>
    `
    }
];

export default function FaqAccordion() {
    return (
        <main className="content-page">
            <div className="container text-center">
                <div className="col-sm-12 bg-white" style={{borderRadius:"4px"}}>
                    <div id="product-accordion">
                        <div className="accordion" id="faq">
                            {faqs.map((faq) => (
                                <div className="card" key={faq.id}>
                                    <div className="card-header">
                                        <a
                                            href="#"
                                            className="btn btn-header-link collapsed"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#dropdown-${faq.id}`}
                                            aria-expanded="false"
                                        >
                                            {faq.category && (
                                                <span>
                                                    <img
                                                        draggable="false"
                                                        role="img"
                                                        className="emoji"
                                                        alt="⚡️"
                                                        src="https://s.w.org/images/core/emoji/16.0.1/svg/26a1.svg"
                                                    />{" "}
                                                    {faq.category}
                                                </span>
                                            )}{" "}
                                            {faq.title}
                                        </a>
                                    </div>
                                    <div
                                        id={`dropdown-${faq.id}`}
                                        className="collapse"
                                        data-bs-parent="#faq"
                                    >
                                        <div
                                            className="card-body"
                                            dangerouslySetInnerHTML={{ __html: faq.content }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
