import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
const PrivacyPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleBackButton = () => {
    navigate("/register");
  };
  return (
    <div className="container my-5 p-3">
      <div style={{ marginTop: "50px" }} className="h1 text-center p-header ">
        PRIVACY POLICY
      </div>
      <div>
        <p>
          We are committed to protecting your privacy. This Privacy Policy
          applies to all our associated applications owned and controlled by us.
          This Privacy Policy governs our data collection, processing and usage
          practices. It also describes your choices regarding use, access and
          correction of your personal information. If you do not agree with the
          data practices described in this Privacy Policy, you should not use
          the Websites or the application. We periodically update this Privacy
          Policy.
        </p>
        <p>
          {" "}
          We will post any privacy policy changes on this page and, if the
          changes are significant, we will provide a more prominent notice by
          sending you an email notification, or through the Notification app in
          your portal.
        </p>
        <p>
          While we will notify you of any material changes to this Privacy
          Policy, changes will become effective immediately upon notification.
          We will also keep prior versions of this Privacy Policy in an archive
          for your review.
        </p>
      </div>
      <ol>
        <li className="">
          {" "}
          <p className="list-heading">Use of Service By Our Customers</p>
          <p>
            When you visit the Websites or register for the Subscription
            Service, we may request that you provide Personal Information about
            yourself, and we collect Navigational Information. Your information
            is also collected when you:{" "}
          </p>
          <ol className="lower-alpha">
            <li> Register for profile assignment</li>
            <li>
              Subscribe to newsletters, alerts or other services from us;{" "}
            </li>
            <li>
              Ask us for more information about a product or service or contact
              us with a question or complaint.
            </li>
            <li>Take part in a survey; </li>
            <li>Use our application and other products or services.</li>
            <li> Visit or browse our website. </li>
          </ol>
        </li>
        <p />
        <p>
          {" "}
          With your permission or consent and/or as permitted by law, we may
          also collect information about you from other organizations or third
          parties, if this is appropriate and allowed by law. These include
          fraud-prevention agencies, business directories, and credit reference
          agencies.
        </p>{" "}
        <p>
          {" "}
          Your information is added to our database and this information is then
          used to contact you about your interest in our goods or services and
          interact with the company.
        </p>
        <p>
          We use mobile analytics software to allow us to better understand the
          functionality of our Mobile Apps on your mobile device. This software
          may record information such as how often you use the application, the
          events that occur within the application, aggregated usage,
          performance data, and where the application was downloaded from.
        </p>{" "}
        <p>
          {" "}
          In addition to information, we collect on our websites, when you use
          our Mobile Apps, we may also collect your city location, device model
          and version, device identifier (or “UDID”), OS version, and your
          Subscription Service credentials. We send push notifications from time
          to time to update you about events or promotions. We may link
          information we store within the analytics software to Personal
          Information you submit within the Mobile App. We do this to improve
          the services we offer you and improve our marketing, analytics and
          site functionality.
        </p>
        <li>
          <p className="list-heading">
            To Unsubscribe from Our Communications{" "}
          </p>
          <p>
            If you no longer wish to receive such communications such ads/
            marketing messages from us, you may unsubscribe by contacting our
            customer services team or utilize any of the opt out turning them
            off at the device level, or clicking on the “unsubscribe” link
            located on the bottom of our e-mails, or through the Contact Us page
            on our website or our App).you will also be able to update your
            communication preferences, or by sending us emails.
          </p>{" "}
          <p>
            {" "}
            You however cannot opt out of receiving transactional emails related
            to your account with us or the Subscription Service. If you choose
            to unsubscribe or opt out, we will hold your contact details on the
            file marked so that we do not contact you again. This is so that we
            do not contact you if your details are subsequently provided to us
            by a third party.
          </p>
          <p>
            You however cannot opt out of receiving transactional emails related
            to your account with us or the Subscription Service.{" "}
          </p>
        </li>
        <li>
          <p className="list-heading"> Corrections of Personal Information:</p>{" "}
          <p>
            You may access, correct, amend, and delete your personal information
            or object to the processing of your personal information in writing
            by sending us an email.
          </p>{" "}
          <p>
            {" "}
            Upon receipt of your written request and enough information to
            permit us to identify your personal information, we will disclose to
            you the personal information we hold about you, for which we may
            make a charge as allowed by applicable law.
          </p>{" "}
          <p>
            We will also correct, amend or delete any personal information that
            you tell us is inaccurate and notify any third-party recipients of
            the necessary changes. You may update any information you have given
            to us by contacting us at our registered address.
          </p>{" "}
          <p>
            Requests to delete personal information are subject to any
            applicable legal and ethical reporting or document retention
            obligations imposed on us.
          </p>
        </li>
        <li>
          <p className="list-heading"> Information we collect</p>
          <ol>
            <li className="lower-alpha">
              <p>
                ​“Personal Information” The information we may collect about you
                depends on your use of our application. (We collect personal
                information of all our users). This refers to any information
                that you voluntarily submit to us and that identifies you
                personally, including contact information, such as your name,
                e-mail address, phone number, and other information about
                yourself. Personal Information can also include information
                about any transactions, both free and paid, that you enter into
                on the Websites, and information about you that is available on
                the internet, such as from Facebook, Instagram, LinkedIn,
                Twitter and Google, or publicly available information that we
                acquire from service providers, Your contact with us – such as:
              </p>
            </li>
            <ul>
              <li>
                The phone numbers that you call or send messages to (or the
                phone numbers that you receive these calls and messages from);{" "}
              </li>
              <li>
                The date, time and length of the calls and messages you send or
                receive through our application, and your approximate location
                at the time these communications take place;{" "}
              </li>
              <li>The level of service you receive </li>
              <li>
                Your website browsing information (which includes information
                about the websites you visit), and about how you use our website
                on your mobile or a PC;{" "}
              </li>
              <li>
                The date, time and length of your internet browsing, and your
                approximate location at the time of browsing;{" "}
              </li>
              <li>
                Your location and contact list on your mobile phone when using
                our apps and platforms.
              </li>{" "}
              <p></p>
            </ul>
            <p>
              Personal Information also includes Navigational Information or
              Payment Information where such information can directly or
              indirectly identify an individual. Navigational information refers
              to information about your computer and your visits to this website
              such as your IP address, geographical location, browser type,
              referral source, length of visit and pages viewed. Please see the
              “Navigation Information” section below. We collect and process
              payment information from you when payment is made via our
              platform, including credit and debit card numbers and billing
              information, using third party PCI-compliant service providers.
              Except for this, we do not collect Sensitive Information from you.
            </p>
            <p></p>
            <li className="lower-alpha">
              <p className="list-heading">
                {" "}
                ​Information we collect from third parties{" "}
              </p>
              <p>
                {" "}
                From time to time, we may receive Personal Information about you
                from third party sources including partners with which engage in
                joint marketing activities, and publicly available sources such
                as social media websites.{" "}
              </p>
            </li>
            <p></p>
            <li className="lower-alpha">
              {" "}
              <p className="list-heading">Information About Children </p>
              <p>
                The Websites are not intended for or targeted at children under
                16, and we do not knowingly or intentionally collect information
                about children under 16. If you believe that we have collected
                information about a child under 16, please contact us at, so
                that we may delete the information.{" "}
              </p>
            </li>
          </ol>
        </li>
        <p></p>
        <li>
          <p className="list-heading">How We Use Information We Collect</p>{" "}
          <p>
            We use the information we collect only in compliance with this
            Privacy Policy. Customers who subscribe to our Services (register on
            our website) are obligated through our agreements with them to
            comply with this Privacy Policy. We will never sell your Personal
            Information to any third party.
          </p>{" "}
          <p>
            {" "}
            In addition to the uses identified elsewhere in this Privacy Policy,
            we may use your Personal Information to:{" "}
          </p>
        </li>
        <ol className="lower-alpha">
          <li>
            {" "}
            improve your browsing experience by personalizing the Websites and
            to improve the Subscription Service;
          </li>
          <li>
            {" "}
            send information or content to you which we think may be of interest
            to you by post, email, or other means and send you marketing
            communications relating to our business;
          </li>
          <li>
            promote use of our services to you and share promotional and
            information content with you in accordance with your communication
            preferences;{" "}
          </li>
          <li>
            {" "}
            provide other companies with statistical information about our users
            — but this information will not be used to identify any individual
            user;
          </li>
          <li>
            send information to you regarding changes to our Customer Terms of
            Service, Privacy Policy (including the Cookie Policy), or other
            legal agreements
          </li>
          <li> meet legal requirements</li>
          <li>
            We may, from time to time, contact you on behalf of external
            business partners about a particular offering that may be of
            interest to you. In those cases, we do not transfer your Personal
            Information to the third party.
          </li>
          <li>
            We use the information collected through our Subscription Service by
            our customers for the following purposes:
          </li>
          <li>
            {" "}
            to provide the Subscription Service (which may include the
            detection, prevention and resolution of security and technical
            issues);
          </li>
          <li>to respond to customer support requests; and</li>
          <li>
            Otherwise, to fulfil the obligations under the Customer Terms of
            Service.{" "}
          </li>
          <li>
            {" "}
            Process the goods and services you’ve bought from us, and keep you
            updated with your order progress;
          </li>
          <li>
            Keep you informed generally about new products and services (unless
            you choose not to receive our marketing messages);
          </li>
          <li>
            Provide the relevant service or product to you. This includes other
            services not included in your agreement with us, and services that
            use information about where you are when using your mobile
            application (location information) and to contact you with messages
            about changes to the service or product;
          </li>
          <li>
            Contact you with offers or promotions based on how you use our
            products and services. These include your calling and messaging
            activities, location information and browsing information (unless
            you choose not to receive these messages);
          </li>
          <li>
            Bill you for using our products or services, or to take the
            appropriate amount of credit from you;
          </li>
          <li>To administer this Website and help us improve our services;</li>
          <li>
            Respond to any questions or concerns you may have about using our
            application, products or services;
          </li>
          <li>
            Let you know about other companies’ products and services we think
            may interest you (including offers and discounts we’ve specially
            negotiated for our customers);{" "}
          </li>
          <li>
            Protect our application and manage the volume of calls, texts and
            other use of our application. For example, we identify peak periods
            of use so we can try and ensure the application can handle the
            volume at those times;
          </li>
          <li>
            Understand how you use our application, products and services. That
            way, we can develop more interesting and relevant products and
            services, as well as personalising the products and services we
            offer you;{" "}
          </li>
          <li>
            Carry out research and statistical analysis including to monitor how
            customers use our application, products and services on an anonymous
            or personal basis;{" "}
          </li>
          <li>
            Prevent and detect fraud or other crimes, recover debts or trace
            those who owe us money;
          </li>
          <li>
            Provide aggregated reports to third parties (such reports do not
            contain any information which may identify you as an individual).
          </li>
          <p></p>
        </ol>
        <p>
          The information we use will include your approximate location, based
          on the nearest mobile cell site. As a result, this will change as you
          move around with your mobile phone.{" "}
          <p>
            We will store your information for as long as we must by law. If
            there is no legal requirement, we will only store it for as long as
            we need it.
          </p>
        </p>
        <li>
          {" "}
          <p className="list-heading">Sharing your personal information: </p>
          <p>
            As may be permitted or authorized by law we may share information
            about you with Partners or agents involved in delivering the
            products and services you’ve ordered or used such as Partners or
            agents that conduct application performance and customer
            satisfaction surveys and any other surveys related to the products
            or services provided to you. Other reasons for sharing your data
            includes the following:
          </p>
          <ol className="lower-alpha">
            <li>
              Where applicable, credit reference, fraud prevention or business
              scoring agencies, or other credit scoring agencies;
            </li>
            <li>
              Debt collection agencies or other debt recovery organizations;
            </li>
            <li>
              Law enforcement agencies, regulatory organizations, courts or
              other public authorities if we have to, or are authorized to by
              law;{" "}
            </li>
            <li>
                Emergency services (if you make an emergency call), including
              your approximate location;{" "}
            </li>
            <li>
              We’ll release information if it’s reasonable for the purpose of
              protecting us against fraud, defending our rights or property, or
              to protect the interests of our customers; whether by merger,
              acquisition, bankruptcy or otherwise, that company would receive
              all information gathered on the Websites and the Subscription
              Service. In this event, you will be notified via email and/or a
              prominent notice on our website, of any change in ownership, uses
              of your Personal Information, and choices you may have regarding
              your Personal Information.{" "}
            </li>
            <li>
              we may transfer any personal information we hold about you to that
              organization.{" "}
            </li>
            <li>
              At your option, and only with your consent, we may also share your
              information with partner organizations we’ve chosen carefully, so
              they can contact you about their products and services.
            </li>
            <li>
              We may share, transfer or disclose the information in our
              databases and server logs to comply with a legal requirement, for
              the administration of justice, interacting with anti-fraud
              databases, to protect your vital interests, to protect the
              security or integrity of our databases or this Website, to take
              precautions against legal liability, or in the event of our
              flotation on a stock exchange, sale, merger, reorganization,
              dissolution, disposal of all or part of our assets or similar
              event. We will inform you of any such transfer or disclosure if we
              are required to do so by law.
            </li>
            <p></p>
          </ol>
          <p>
            {" "}
            Where appropriate, before disclosing personal information to a third
            party, we contractually require the third party to take adequate
            precautions to protect that data and to comply with applicable law.
          </p>
           
        </li>
        <li>
          <p className="list-heading"> Transfer of information:</p>{" "}
          <p>
            If you are visiting this Website, the various communications might
            necessarily result in the transfer of certain non-prohibited
            information across international boundaries.
          </p>{" "}
          <p>
            We may also need to transfer your information to other affiliate
            companies or service providers, in which case we will fully comply
            with applicable data protection legislation.
          </p>{" "}
          <p>
            {" "}
            Countries in the European Economic Area (EEA) are considered to have
            adequate data protection laws. Other countries outside the EEA may
            not have relevant data-protection laws, however, we will make sure
            that your information is protected and enter into appropriate
            agreements to achieve this.
          </p>
        </li>
        <li>
          <p className="list-heading">Use of Credit Card Information </p>
          <p>
            If you give us credit card information, we use it solely to check
            your financial qualifications and collect payment from you. We use a
            third-party service provider to manage credit card processing. This
            service provider is not permitted to store, retain, or use
            information you provide except for the sole purpose of credit card
            processing on our behalf.{" "}
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">Security of your Personal Information </p>
          <p>
            We use a variety of security technologies and procedures to help
            protect your Personal Information from unauthorized access, use or
            disclosure. We secure the Personal Information you provide on
            computer servers in a controlled, secure environment, protected from
            unauthorized access, use or disclosure. All Personal Information is
            protected using appropriate physical, technical and organizational
            measures. ​{" "}
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading"> Social Media Features</p>
          <p>
            {" "}
            Our websites include Social Media Features, such as the Facebook
            Like button and Widgets, such as the Share This button or
            interactive mini-programs that run on our sites. These features may
            collect your IP address, which page you are visiting on our sites,
            and may set a cookie to enable the feature to function properly.
            Social Media Features and Widgets are either hosted by a third party
            or hosted directly on our websites. This Privacy Policy does not
            apply to these features.  Your interactions with these features are
            governed by the privacy policy and other policies of the companies
            providing them.{" "}
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">External Websites</p>
          <p>
            Our websites provide links to other websites. We do not control, and
            are not responsible for, the content or practices of these other
            websites. Our provision of such links does not constitute our
            endorsement of these other websites, their content, their owners, or
            their practices. This Privacy Policy does not apply to these other
            websites, which are subject to any privacy and other policies they
            may have.{" "}
          </p>
        </li>
        <li>
          <p className="list-heading"> Public Forum</p>
          <p>
            {" "}
            We offer publicly accessible message boards, blogs, and community
            forums. In the event that you directly disclose any information
            through our public message boards, blogs, or forums, this
            information may be collected and used by others. We will correct or
            delete any information you have posted on the Websites if you so
            request, as described in “Opting Out and Unsubscribing” below.
          </p>
        </li>
        <li>
          <p className="list-heading"> Retention of Personal Information</p>
          How long we keep the information we collect about you depends on the
          type of information. as described in further detail below.  After such
          time, we will either delete or anonymize your information or, if this
          is not possible, then we will securely store your information and
          isolate it from any further use until deletion is possible.
          <ol className="lower-roman">
            <li>
              We retain Personal Information that you provide to us where we
              have an ongoing legitimate business need to do so (for example, as
              long as is required in order to contact you about the Subscription
              Service or our other services, or as needed to comply with our
              legal obligations, resolve disputes and enforce our agreements).
            </li>
            <li>
              When we have no ongoing legitimate business need to process your
              Personal Information, we securely delete the information or
              anonymise it or, if this is not possible, then we will securely
              store your Personal Information and isolate it from any further
              processing until deletion is possible. We will delete this
              information from the servers at an earlier date if you so request,
              as described in “To Unsubscribe from Our Communcations” below.
            </li>
            <li>
              If you provide information to our customers as part of their use
              of the Subscription Service, our customers decide how long to
              retain the personal information they collect from you. If a
              customer terminates its use of the Subscription Service, then we
              will provide customer with access to all information stored for
              the customer by the Subscription Service, including any Personal
              Information provided by you, for export by the customer according
              to our agreement with our customer. After termination, we may,
              unless legally prohibited, delete all customer information,
              including your Personal Information
            </li>
            <li>
              If you have elected to receive marketing communications from us,
              we retain information about your marketing preferences for a
              reasonable period of time from the date you last expressed
              interest in our content, products, or services, such as when you
              last opened an email from us or ceased using your account.  We
              retain information derived from cookies and other tracking
              technologies for a reasonable period of time from the date such
              information was created.
            </li>
            <p></p>
          </ol>
        </li>
        <li>
          <p className="list-heading"> Information Security:</p>
          <p>
            {" "}
            We have specialised security teams who constantly review and improve
            our measures to protect your personal information from unauthorized
            access, accidental loss, disclosure or destruction.
          </p>{" "}
          <p>
            {" "}
            If we have a contract with another organization to provide us with
            services or a service on our behalf to process your personal
            information, we will ensure that your information is protected and
            that they only process your information in the way we have
            authorized them to and as may be permitted by the law. These
            organizations will not be entitled to use your personal information
            for their own purposes. If necessary, our security teams will check
            them to make sure they meet the security requirements we have set.
          </p>{" "}
          <p>
            Communications over the internet (such as emails) are not secure
            unless they have been encrypted. Your communications may go through
            a number of countries before being delivered – as this is the nature
            of the internet. We cannot accept responsibility for any
            unauthorized access or loss of personal information that’s beyond
            our control.
          </p>
          <p>
            {" "}
            We’ll never ask for your secure personal or account information by
            unsolicited means of communication. You’re responsible for keeping
            your personal and account information secure and not sharing it with
            others.
          </p>{" "}
          <p>
            {" "}
            You may choose to disclose your information in certain ways such as
            social plug-ins (including those offered by Google, Facebook,
            Twitter and Pinterest) or using third-party services that allow you
            to post reviews or other information publicly, and a third party
            could use that information.
          </p>{" "}
          <p>
            {" "}
            Social plug-ins and social applications are operated by the social
            application themselves and are subject to their own terms of use and
            privacy and cookies policies. You should make sure you’re familiar
            with these.{" "}
          </p>
        </li>
        <li>
          <p className="list-heading">
            {" "}
            Anonymous data collected through this Website:
          </p>
          <p>
            In addition to the information, we collect as described above, we
            use technology to collect anonymous information about the use of our
            website. For example, our web server automatically logs which pages
            of our website our visitors view, their IP addresses and which web
            browsers our visitors use. This technology does not identify you
            personally; it simply enables us to compile statistics about our
            visitors and their use of our website.
          </p>{" "}
          <p>
            Our website contains hyperlinks to other pages on our website. We
            may use technology to track how often these links are used and which
            pages on our website our visitors choose to view. Again, this
            technology does not identify you personally – it simply enables us
            to compile statistics about the use of these hyperlinks.{" "}
          </p>
          <p>
            Likewise, if you reached our website by clicking on a link or
            advertisement on another website, we also log that information. This
            assists us to maximize our Internet exposure as well as understand
            the interests of our users. All of this information is collected and
            used only in the aggregate: it is entered into our database, where
            we can use it to generate overall reports on our visitors, but not
            reports about individual visitors.{" "}
          </p>
          <p>
            {" "}
            We also use your IP address to help diagnose problems with our
            server and to administer our website. An IP address is a numeric
            code that identifies your computer on a application, or in this
            case, the Internet. Your IP address is also used to gather broad
            demographic information. We may also perform IP lookups to determine
            which domain you are coming from to more accurately gauge our users’
            demographics.{" "}
          </p>
        </li>
        <li>
          <p className="list-heading"> Cookies and Similar Technologies</p>
          <p>
            We use cookies to analyze trends, administer the website, track
            users’ movements around the website, and to gather demographic
            information about our user base as a whole.
          </p>{" "}
          <p>
            {" "}
            We might also use cookies (small text files stored in your browser)
            to collect information that makes the website remember you and tells
            us how you use our application, web-related products and services.
            This, in turn, helps us make our application relevant to your
            interests and needs. They also help us find information once you
            have logged in or help us link your browsing information to you and
            your personal information, for example, when you choose to register
            for a service.  We may use a persistent cookie (a cookie that stays
            linked to your browser) to record your details so we can recognize
            you if you visit our website again.
          </p>{" "}
          <p>
            {" "}
            Cookies themselves cannot be used to discover your identity. Cookies
            do not damage your computer or phone. You can set your browser to
            notify you when you receive a cookie. This enables you to decide if
            you want to accept it or not. If you choose not to accept cookies
            from our website this may limit its functionalities or performance{" "}
          </p>
        </li>
        <li>
          <p className="list-heading">
            Navigational Information Collected by Our Customers
          </p>{" "}
          <p>
            {" "}
            Our customers can use the tools we provide, as well as tools
            provided by third parties, to collect Navigational Information when
            you visit their webpages on the Subscription Service. We do not
            control our customers’ use of these tools, nor do we control the
            information they collect or how they use it.{" "}
          </p>
        </li>
        <li>
          <p className="list-heading">Advertising</p>
          <p>
            {" "}
            <p>
              We partner with a third-party ad application to either display
              advertising on our Web site or to manage our advertising on other
              sites. Our application uses cookies and Web beacons to collect
              information about your activities on this and other Web sites to
              provide you targeted advertising based upon your interests. The
              use of cookies and web beacons by any tracking utility company is
              not covered by our Privacy Policy or Cookie Policy.
            </p>
          </p>
        </li>
        <li>
          <p className="list-heading">
            Notification of changes to the Privacy Policy:
          </p>{" "}
          <p>
            We are continually improving our methods of communication and adding
            new functionality and features to our websites and to our existing
            services. Because of ongoing changes in the law and the changing
            nature of technology, our data protection practices will change from
            time to time. If and when our data protection practices change, we
            will update this Privacy Policy to describe our new practices.
          </p>
        </li>
        <li>
          <p className="list-heading"> Links to other websites:</p>{" "}
          <p>
            Our website may contain hyperlinks to other websites, such as 3rd
            party payment platforms or websites for processing of payment of our
            services or products, which are not operated by us. We do not
            control these websites and are not responsible for their data or
            privacy practices. We urge you to review any privacy policy posted
            on any site you visit before using the site or providing any
            personal information about yourself and others.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">Feedback:</p>
          <p>
            We welcome comments about this Privacy Statement. If you have any
            questions about this Privacy Policy or any part of our service, you
            may contact us by sending an e-mail or by writing to any of our
            offices near you. We will store any correspondence from you at our
            offices.
          </p>
        </li>
        <li>
          <p className="list-heading"> Governing Law:</p>
          <p>
            {" "}
            The laws of the Federal Republic of Nigeria will govern any dispute
            or claim arising out of or relating to your use of this Website.
          </p>
        </li>
      </ol>
      <div className="d-flex justify-content-around">
        <button
          className="btn btn-primary col-4  md-col-8 my-4"
          onClick={handleBackButton}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
