import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TermsofUse = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleBackButton = () => {
    navigate("/register");
  };
  return (
    // <div >
    <div className="container-fluid my-5 p-3">
      <div className="h1 text-center p-header ">
        TERMS AND CONDITIONS FOR USE OF PLATFORMS{" "}
      </div>
      <ol>
        <li>
          {" "}
          <p className="list-heading">BINDING NATURE </p>
          <p>
            By accessing our services, you are deemed to have accepted to be
            bound by these terms and conditions. If you disagree with these
            general terms and conditions or any part of these general terms and
            conditions, you must not use our services. Our terms and policies
            contain a number of legal obligations and additional terms or
            product requirements which you are presumed to be familiar with. We
            encourage you to thoroughly read through. Additional terms may be
            added from time to time. Those additional terms become part of your
            agreement with us and will be equally binding on you at all times.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">USER REGISTRATION </p>
          <p>
            You may be required to register for this Service. You agree to keep
            your password confidential and will be responsible for all use of
            your account and password. We reserve the right to remove, reclaim,
            or change a username you select if we determine, in our sole
            discretion, that such username is inappropriate, obscene, or
            otherwise objectionable.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">ACCESS TO SERVICE </p>
          <ol className="lower-alpha">
            <li>
              <p>
                Your access or continued access to our services is dependent on
                your Compliance with all the terms and conditions of this
                Agreement and any other future modifications of or additions to
                this Agreement or directives as may be prescribed from time to
                time.{" "}
              </p>
            </li>
            <li>
              We reserve the right to impose registration or subscription fees
              at any time. Where such fees are applied, you will be required to
              comply with payment of same before being granted access to our
              services. Failure to comply shall be a ground for access denial,
              or suspension of our services forthwith.
            </li>
          </ol>
        </li>
        <li>
          {" "}
          <p className="list-heading">USER DATA AND INFORMATION </p>
          <p>
            We will maintain certain data that you transmit to the Service for
            the purpose of managing the Service, as well as data relating to
            your use of the Service. Although we perform regular routine backups
            of data, you are solely responsible for all data that you transmit
            or that relates to any activity you have undertaken using the
            Service. You agree that we shall have no liability to you for any
            loss or corruption of any such data, and you hereby waive any right
            of action against us arising from any such loss or corruption of
            such data. {" "}
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">
            PUBLIC SPACE AND THIRD-PARTY CONTENT AND SITES
          </p>
          <ol className="lower-alpha">
            <li>
              In signing a service contract with us, you acknowledge that we
              have no power to control the content of the information passing
              over the Internet and its applications, including e-mail; chat
              rooms; newsgroups; or other similar fora, and that we cannot be
              held responsible or liable, directly or indirectly, for any of the
              above-mentioned content, in any way for any loss or damage of any
              kind incurred as a result of, or in connection with your use of,
              or reliance on, any such content.{" "}
            </li>
            <li>
              Our services also offer access to numerous third-party webpages.
              You acknowledge that we exercise absolutely no control over such
              third-party content, or sites and in such cases, our application
              is merely a conduit or means of access and transmission. This
              includes, but is not limited to, third party content contained on
              or accessible through our application, and websites and web pages
              or sites displayed as search results or contained within a
              directory of links on our application. It remains your
              responsibility to review and evaluate any such content, and that
              any and all risk associated with the use of, or reliance on, such
              content rests with you.{" "}
            </li>
            <li>
              Access to public Internet spaces, such as bulletin boards, Usenet
              groups, chat rooms and moderated forums is entirely voluntary and
              at your own risk. Our employees do not moderate any of these
              services, or your communications, transmissions or use of these
              services. We do not undertake any responsibility for any content
              contained therein, or for any breaches of your right to privacy
              that you may experience as a result of accessing such spaces.{" "}
            </li>
          </ol>
          <p></p>
        </li>
        <li>
          {" "}
          <p className="list-heading">USER RESPONSIBILITIES </p>
          <ol className="lower-alpha">
            <li>
              You will provide us with such information as we may reasonably
              require enabling us to perform our obligations or exercise our
              rights under these Agreement.
            </li>
            <li>
              You will provide us with accurate and up-to-date information:{" "}
              <ol className="lower-roman">
                <li>
                  When completing the Customer Information and Service Agreement
                  on the website and{" "}
                </li>
                <li>
                  When you contact us to report a fault and is asked a standard
                  set of structured questions.
                </li>
                <li>
                  We shall not be liable for any loss suffered because of your
                  failure to provide accurate information which may lead to a
                  delay in installation or service repair.
                </li>
              </ol>
            </li>
            <li>
              You are responsible for any misuse of our services that occurs
              through your account. It is your responsibility to ensure that
              unauthorized persons do not gain access to or misuse our service.{" "}
            </li>
            <li>
              We urge you not to reply to unsolicited mail or “spam” and not to
              click on any suggested links provided in the unsolicited mail.
              Doing so remains solely your responsibility and we cannot be held
              liable for the Customer being placed on any bulk mailing lists as
              a result.{" "}
            </li>
            <li>
              Where you have authorised a minor to use any of our services or
              access websites, you accept that as the parent/legal guardian of
              that minor, you are fully responsible for: the online conduct of
              such minor; controlling the minor’s access to and use of any
              services or websites; and the consequences of any misuse by the
              minor, including but not limited to transactions entered into by
              the minor using such access.{" "}
            </li>
            <li>
              We cannot be held liable for any business dealings you have with
              any third parties on the Internet, including any vendors, or
              advertisers found on, or through, the application. Further, we
              assume no responsibility whatsoever for any charges you or any
              user of your account incur when making purchases or other
              transactions in this manner. Further, the responsibility for
              ensuring compliance with all applicable customs and exchange
              control laws in connection with any such transactions shall be
              yours.{" "}
            </li>
            <li>
              You will comply with all relevant laws, legislation, regulations
              and rules relating to use of the Access Device and the Services
              and for internet-based communications and businesses.{" "}
            </li>
            <li>
              You undertake not to use the Services for any illegal or immoral
              purposes and you will abide by the current version of the
              Acceptable Use Policy, available as acceptable-use-policy.
            </li>
            <li>
              You shall not act, whether by commission or omission, in any way
              likely to injure or damage any person, property or the application
              or cause the quality of the application to be impaired or
              interrupted in any manner and you fully indemnify us against any
              liability, damage or loss arising from any unlawful, illegal or
              improper use of the application.
            </li>
            <li>
              You shall not access, transmit, store or distribute any data,
              material or content in violation of any applicable law or
              regulation or any acceptable use policy of any application or
              system or any of our third party providers or which infringes on
              our intellectual property rights or any third party or violates
              the privacy of others or which materially affects the quality of
              Services or other telecommunications services provided from time
              to time;
            </li>
            <li>
              You shall not utter, publish, access, transmit, store, distribute
              or create any offensive, obscene, harmful, indecent, illegal,
              discriminatory, inflammatory or unlawful images or content, data
              or other material, or any data capable of resulting in offensive,
              obscene, harmful, indecent, illegal, discriminatory, inflammatory
              or unlawful images or material;{" "}
            </li>
            <li>
              You shall not introduce any malware or malicious programs or codes
              (such as viruses, worms or Trojan horses) into the platform;{" "}
            </li>
            <li>
              You shall not scan the platform for vulnerabilities without
              authorization;{" "}
            </li>
            <li>
              You shall not simulate communications from and/or to the website
              or other service of another entity in order to collect identity
              information, authentication credentials, or other information from
              the legitimate users of that entity’s service (phishing);{" "}
            </li>
            <li>
              You shall not execute any form of application monitoring (e.g.
              using a packet sniffer) or otherwise engage in any monitoring or
              interception of data not intended for the you without
              authorization;
            </li>
            <li>
              {" "}
              You shall not Except as provided for in this Agreement cede any of
              its rights or delegate any of its obligations under this Agreement
              without our prior written consent.{" "}
            </li>
            <li>
              You shall be liable for all actions or omissions of such persons
              when they use any Device to Access the Services provided, save for
              cases where the theft of devices has been communicated in
              accordance with these terms and conditions {" "}
            </li>
          </ol>
          <p></p>
        </li>
        <li>
          {" "}
          <p className="list-heading">PURCHASES </p>
          <p>
            All payments are redirected to 3rd party payment platforms or
            websites for processing of payment of our products and services,
            which are not operated by us. We do not store any payment
            information nor do we operate these platforms or websites and are
            not responsible for their data or privacy practices. We urge you to
            review any privacy policy posted on any site you visit before using
            the site or providing any personal information about yourself and
            others.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">PROVISION OF INFORMATION TO CUSTOMERS </p>
          <ol className="lower-alpha">
            <li>
              you will be provided with completely accurate and up-to-date
              information about our products and services in simple and
              unambiguous languages.
            </li>
            <li>
              {" "}
              Before entering into terms and conditions for any service, you
              shall be provided with a complete description of the service in
              clear and plain language. Where other services are required in
              order to effectively utilize the service, you shall be
              sufficiently informed of such requirements or service
              dependencies.{" "}
            </li>
          </ol>
          <p></p>
        </li>
        <li>
          {" "}
          <p className="list-heading">
             TECHNICAL MEASURES TO PREVENT ABUSE OF THE ACCESS SERVICE{" "}
          </p>
          <p>
            We reserve the right to take such action as may be necessary to
            protect the integrity of our services, including, system monitoring,
            protocol management and shutting down of ports affected by viruses,
            worms or other malicious code.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">SERVICE SUSPENSION </p>
          <ol className="lower-alpha">
            <li>
              We may, at our sole discretion and without prejudice to any right
              which we might have to terminate a Service and/or this Agreement,
              elect to immediately suspend the provision of a Service (or part
              thereof) if:
            </li>

            <ol className="lower-roman">
              <li>
                We have reasonable grounds to consider we are entitled to
                terminate the Service and/or this Agreement for any reasons.{" "}
              </li>
              <li>
                We are obliged to comply with an order, instruction or request
                of a court, government agency, emergency service organization or
                other administrative or regulatory authority.
              </li>
              <li>
                {" "}
                We need to carry out Emergency maintenance Works to the
                application{" "}
              </li>
              <li>
                  We have reasonable grounds to consider that the Service is
                being used fraudulently or illegally or in violation of any laws
                whatsoever{" "}
              </li>
              <li>
                If it appears that your subscription has been exhausted with
                respect to the duration of the Service Option or has been
                forfeited for any reason If we are to exercise our right to
                suspend the Service (or part thereof) we shall, whenever
                reasonably practicable, give prior notice of such suspension to
                you, setting out the reasons for the suspension and the expected
                duration. We shall use all reasonable endeavors to resume the
                Service as soon as is practically possible.{" "}
              </li>
            </ol>
            <li>
              We shall not be liable for any loss, damage or inconvenience
              suffered by you because of any suspension made except to the
              extent that such suspension is solely and directly attributable to
              our negligence.
            </li>
          </ol>
          <p></p>
        </li>
        <li>
          {" "}
          <p className="list-heading">TERMINATION </p>
          <ol className="lower-alpha">
            <li>
              These General Terms shall take effect in respect of each Service,
              from the effective date of each service order.{" "}
            </li>
            <li>
              {" "}
              Either Party may terminate a Service upon the following grounds:{" "}
            </li>
            <ol className="lower-roman">
              <li>
                If We are required by Law where the services provided becomes
                unlawful or where provision of services is no longer
                commercially viable.{" "}
              </li>
              <li>
                if a suspension of a Service has continued for a period of at
                least two (2) consecutive months.{" "}
              </li>
              <li>
                If you have committed a material breach which is incapable of
                remedy.{" "}
              </li>
              <li>
                {" "}
                If you have committed a material breach capable of remedy, but
                which it fails to remedy within ten (10) Business Days of having
                been notified of such breach; or{" "}
              </li>
              <li>
                {" "}
                If you have committed a material breach capable of remedy, but
                which it fails to remedy within ten (10) Business Days of having
                been notified of such breach; or{" "}
              </li>
            </ol>
            <li>
              Where there are reasonable grounds to believe that there has been
              a violation of any of the terms herein, we may notify you and
              require you to remedy such violation of regulations and or an
              imminent threat to the application, or in all other cases, within
              forty-eight (48) hours.{" "}
            </li>
            <li>
              {" "}
              If We reasonably determine that the violation is continuing or is
              likely to reoccur, we may terminate this Agreement (or relevant
              Service) without further recourse to you.{" "}
            </li>
            <li>
              Notice of termination will be deemed sufficient were given in
              writing such as, hard copy letters, emails, text message and any
              other form of written communication which may come into existence
              in the future.{" "}
            </li>
          </ol>
          <p></p>
        </li>
        <li>
          {" "}
          <p className="list-heading">DISCLAIMER </p>
          <p>
            Every effort will be made to provide the highest quality of service
            to the Customer. You acknowledge that our services are
            interconnected internet links provided by other service delivery
            providers/entities that are responsible for ensuring that these
            links are as reliable as possible. We do not own any responsibility
            in the event of interruptions beyond our reasonable control. We
            shall not be responsible for any interruption caused by the quality
            of these links, defect in connectivity or any inconvenience,
            damages, or any other liability whatsoever from Customers or anyone
            else in this regard.{" "}
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">LIABILITY </p>
          <ol className="lower-alpha">
            <li>
              We shall not be held liable for any losses and /or any damages
              sustained due to any reason whatsoever OR for any indirect,
              incidental, special, consequential or punitive damages arising out
              of or in connection with this agreement.{" "}
            </li>
            <li>
              {" "}
              We are unable to exercise editorial or other control over any
              content placed on or accessible through your use of the Services
              and We shall have no liability as to the quality, content or
              accuracy of information received through or because of the use of
              the Services.{" "}
            </li>
          </ol>
        </li>
        <li>
          {" "}
          <p className="mt-3 list-heading">FORCE MAJEURE: </p>
          <ol className="lower-alpha">
            <li>
              {" "}
              We are not liable for failure to perform its obligations if such
              failure include (but is not limited to acts of God, enemy
              hostilities, fire outbreak, flood, lightning strikes, earthquakes,
              storm, hurricane and or other natural disasters) war, invasion,
              act of foreign enemies(regardless of whether war is declared or
              not), civil war, rebellion, revolution, insurrection, military or
              usurped political powers or confiscation, terrorist activities,
              nationalization, government sanction, embargo, labor dispute,
              strike, lockout, or industrial action or failure of electricity or
              telecommunications services across the country, action of
              regulatory authorities, or local or national government or
              authorities or any event that can be reasonably termed a force
              majeure.{" "}
            </li>
            <li>
                Notwithstanding anything herein to the contrary, neither Party
              shall be liable to the other for any delay, failure in performance
              of any part of this Agreement (other than for payment obligations)
              or damages suffered to the extent that such delay or failure is
              attributable to a Force Majeure Event or any event that may be
              reasonably termed as a Force majeure.{" "}
            </li>
          </ol>
        </li>
        <li>
          {" "}
          <p className="mt-3  list-heading">​INTELLECTUAL PROPERTY </p>
          <p>
            You acknowledge that all patents, registered and unregistered
            designs, copyrights, trademarks and all other intellectual property
            rights whatsoever and wherever enforceable, which are used in
            connection with the Service, shall remain our sole property as well
            as relevant contractors or suppliers. You shall not in any way
            tamper with, modify or decompile or do such things as may affect the
            intellectual property rights of with respect to the provision and
            use of the Services.{" "}
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">AMENDMENT OF TERMS AND CONDITIONS </p>
          <p>
            We reserve the right to change, modify or amend the terms and
            conditions of our services.  Change may be made necessary due to{" "}
          </p>
          <ol className="lower-alpha">
            <li>
              {" "}
              amendment to any law or regulations governing our services{" "}
            </li>
            <li>
              {" "}
              at our sole discretion if we decide to amend terms for reasons of
              quality of service, or for the benefit of our customers or for
              business practices and policies changes.{" "}
            </li>
            <li>
              {" "}
              If there is any information on the Service that contains
              typographical errors, inaccuracies, or omissions that may relate
              to the Service, including descriptions, pricing, availability, and
              various other information. We reserve the right to correct any
              errors, inaccuracies, or omissions and to change or update the
              information on the Service at any time, without prior notice.{" "}
            </li>
          </ol>
        </li>

        <li>
          {" "}
          <p className="mt-3 list-heading">DISRUPTIONS </p>
          <p>
            We cannot guarantee the Service will be available at all times. We
            may experience software, or other problems or need to perform
            maintenance related to the Service, resulting in interruptions,
            delays, or errors. We reserve the right to change, revise, update,
            suspend, discontinue, or otherwise modify the Service at any time or
            for any reason without notice to you. You agree that we have no
            liability whatsoever for any loss, damage, or inconvenience caused
            by your inability to access or use the Service during any breakdown
            or discontinuance of the Service. Nothing in these Terms of Use will
            be construed to obligate us to maintain and support the Service or
            to supply any corrections, updates, or releases in connection
            therewith.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">INDEMNITY </p>
          <p>
            You will be responsible for and shall indemnify us and our
            subsidiaries, affiliates, and all of our respective officers,
            agents, partners, and employees, and hold us blameless against.{" "}
          </p>
          <ol className="lower-alpha">
            <li>
              Any direct or consequential liability arising out of claims made
              against us, our affiliates, employees, or representatives
              howsoever described in connection with the use of our internet
              service modem or service or misuse by you, or any other person
              including but not limited to claims of fraud, defamation,
              copyright infringement, or any other breach of intellectual
              property rights and any breach occasioned by non-observance of the
              terms and conditions of this agreement,{" "}
            </li>
            <li>
              {" "}
              Any breach of your representations and warranties set forth in
              these Terms of Use;{" "}
            </li>
            <li>
              Your violation of the rights of a third party, including but not
              limited to intellectual property rights; or any overt harmful act
              toward any other user of the Service with whom you connected via
              the Service.{" "}
            </li>
          </ol>
          <p>
            Notwithstanding the foregoing, we reserve the right, at your
            expense, to assume the exclusive defense and control of any matter
            for which you are required to indemnify us, and you agree to
            cooperate, at your expense, with our defense of such claims. We will
            use reasonable efforts to notify you of any such claim, action, or
            proceeding which is subject to this indemnification upon becoming
            aware of it.{" "}
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">DISPUTE RESOLUTION: </p>
          <ol className="lower-alpha">
            <li>
              {" "}
              In the event of differences or disputes which may arise in
              connection with this agreement or its interpretation, the parties
              shall negotiate in good faith with a view to settling the matter
              amicably.{" "}
            </li>
            <li>
              Where negotiation fails, parties shall submit to the Lagos State
              Multidoor courthouse for Mediation or Arbitration. Provided that
              the parties shall bear their respective costs inclusive of
              attorney fees.{" "}
            </li>
          </ol>
        </li>
        <li>
          {" "}
          <p className="mt-3 list-heading">DURATION AND TIME: </p>
          <p>
            This contract shall commence on the date of approval after
            acceptance of these terms and conditions by the customer and the
            provisions of this contract shall continue thereafter until
            terminated by either party.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">APPLICABLE LAWS </p>
          <p>
            No provision of the Agreement is intended to contravene the
            applicable provisions of the Consumer Protection Act, and therefore
            all provisions of the Agreement to the extent that the Agreement or
            any goods and services provided under the Agreement documents are
            governed by the Consumer Protection Act of 2008, must be treated as
            qualified, to the extent necessary, to ensure that the applicable
            provisions of the Consumer Protection Act are complied with.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">RESERVATION AND NON-WAIVER OF RIGHTS </p>
          <ol className="lower-alpha">
            <li>
              {" "}
                ​We reserve the right to amend or alter this policy at any time,
              and without notice to you.
            </li>
            <li>
              We reserve the right to take action against any individuals,
              companies or organizations that violate any of the prohibited
              activities set out herein or engage in any illegal or unlawful
              activity while accessing our services, to the fullest extent of
              the law.{" "}
            </li>
            <li>
              We reserve the right, at our sole discretion, to act against other
              types of abuse not listed in this document and to investigate or
              prevent illegal activities being committed under our application.{" "}
            </li>
            <li>
              We reserve the right to monitor user- and platform traffic for
              site security purposes and prevent any unauthorized attempts to
              tamper with our site or cause damage to our property.
            </li>
            <li>
              {" "}
              We reserve the right to suspend, revoke or cancel our services to
              you if the safety and integrity of our resources are placed at
              risk in continuing to provide service to the subscriber/user.
            </li>
            <li>
              We reserve the right to remove any information or materials in
              whole or in part, that, in our sole discretion, is deemed to be
              offensive, indecent, or otherwise objectionable.{" "}
            </li>
            <li>
              We do not undertake to guarantee the security of any data passing
              through the applications. Although we will provide a “best effort”
              service, including regular updates on computer viruses and other
              threats to security of data, it is the responsibility of the
              communicating parties to safeguard their data, and we cannot be
              held liable for any loss or damage arising as result of the
              failure to do so.{" "}
            </li>
          </ol>
          <p></p>
        </li>
        <li>
          {" "}
          <p className="list-heading">SURVIVAL </p>
          <p>
            Termination of this Agreement shall not affect a clause that
            necessarily or by its context requires survival of these General
            Terms.{" "}
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">SEVERABILITY </p>
          <p>
            If any clause or term of this Agreement should be invalid,
            unenforceable, defective or illegal for any reason whatsoever, then
            the remaining terms and provisions of this Agreement shall be deemed
            to be severable and shall continue in full force and effect unless
            such invalidity, unenforceability, defect or illegality goes to the
            root this Agreement.
          </p>
        </li>
        <li>
          {" "}
          <p className="list-heading">MODIFICATION</p>
          <p>
            We reserve the right to modify, amend or amplify the terms and
            conditions and policies tariffs, services, charges and other
            essential ingredients of or relating to the Agreement at any time
            without prior notice. Changes shall become effective as soon as they
            are posted to our website; provided that in the case of an increase
            in tariffs or charges, the Subscriber shall be duly notified of the
            changes thereafter.{" "}
          </p>
        </li>
        <li>
          <p className="list-heading">MISCELLANEOUS</p>
          <ol className="lower-alpha">
            <li>
              These General Terms and establish the terms and conditions under
              which we shall provide the Services to you.{" "}
            </li>
            <li>
              These Terms of Use and any policies or operating rules posted by
              us on the Service constitute the entire agreement and
              understanding between you and us. Our failure to exercise or
              enforce any right or provision of these Terms of Use shall not
              operate as a waiver of such right or provision.{" "}
            </li>
            <li>
              {" "}
              These Terms of Use operate to the fullest extent permissible by
              law. We may assign any or all of our rights and obligations to
              others at any time.{" "}
            </li>
            <li>
              We shall not be responsible or liable for any loss, damage, delay,
              or failure to act caused by any cause beyond our reasonable
              control.{" "}
            </li>
            <li>
              There is no joint venture, partnership, employment or agency
              relationship created between you and us as a result of these Terms
              of Use or use of the Service.{" "}
            </li>
            <li>
              {" "}
              You agree that these Terms of Use will not be construed against us
              by virtue of having drafted them. You hereby waive any and all
              defenses you may have based on the electronic form of these Terms{" "}
            </li>
            <li>
              {" "}
                The rule of construction that the contract shall be interpreted
              against the Party responsible for the drafting or preparation of
              the Agreement, shall not apply.{" "}
            </li>
            <li>
              {" "}
              This Agreement shall be binding on and enforceable by the estates,
              heirs, executors, administrators, trustees, permitted assigns or
              liquidators of the Parties as fully and effectually as if they had
              signed this Agreement in the first instance and reference to any
              Party shall be deemed to include such Party’s estate, heirs,
              executors, administrators, trustees, permitted assigns or
              liquidators, as the case may be.{" "}
            </li>
            <li>
              {" "}
              The expiration or termination of this Agreement in as far as the
              different service/product options are concerned shall not affect
              such of the provisions of this Agreement as expressly provided
              that they will operate after any such expiration or termination or
              which of necessity must continue to have effect after such
              expiration or termination, notwithstanding that the clauses
              themselves do not expressly provide for this.
            </li>
          </ol>
        </li>
      </ol>{" "}
      <div className="h1 my-5 text-center p-header ">POLICIES </div>
      <ol>
        <div className="h1 mb-2 text-center p-header ">
          SERVICE DELIVERY POLICY{" "}
        </div>
        <li>
          <p className="list-heading">SECURITY/PASSWORD</p>
          <p>
            You shall ensure that the security encryption is enabled and
            password/s on all access devices such as modem or application
            installed where provided is kept secret at all times, not disclosed
            to unauthorized persons and to change the password immediately after
            installation. You shall not part with the password, and We shall not
            be liable for any losses arising out of security breaches as a
            result of the failure of the customer to properly secure the
            password and devices from unauthorized persons.
          </p>
        </li>
        <li>
          <p className="list-heading">MAINTENANCE</p>
          <p>
            Maintenance will be performed as at when necessary and reasonable
            care will be taken to communicate such maintenance. We reserve the
            right to perform emergency maintenance without prior notice, but we
            shall nonetheless endeavor to provide such notice as is reasonably
            and practically possible in the circumstances.{" "}
          </p>
        </li>
        <li>
          <p className="list-heading">START DATE FOR A SERVICE SHALL BE: </p>
          <ol className="lower-alpha">
            <li>
              Where the Service is a new service and/or requires on-site
              installation to be performed, the event described below that
              occurs first in time: –{" "}
            </li>
            <ol className="lower-roman">
              <li>
                The date on which you deliver to a signed confirmation schedule,
                being the “Acceptance Date”; or{" "}
              </li>
              <li>
                The date you first use the Service, being the deemed “Acceptance
                Date” or “Service Activation Date”; or{" "}
              </li>
              <li>
                In the case where you, through no fault of We, fail to deliver a
                confirmation schedule, to use the Service or to complete your
                obligations necessary to use the Service, then the date on which
                we deliver a ready for Service Notification (which shall also be
                the “Completion of Connection” or deemed “Service Activation”
                date);{" "}
              </li>
            </ol>
            <li>
              Where the Service as set out in the Service Order can be
              implemented by means of a billing change and/or system
              configuration changes, date the billing or system configuration
              change takes effect.{" "}
            </li>
          </ol>
        </li>
      </ol>
      <div>
        <div className="h1 mt-5 text-center p-header ">
          ACCEPTABLE USE POLICY (AUP)
        </div>
        <p>
          The purpose of this terms, Acceptable Use Policy (‘AUP”) is to comply
          with the relevant laws of the Federal Republic of Nigeria; to specify
          to customers and users of our service/website what activities and
          online behavior are considered an unacceptable use of the
          service/website; to protect the integrity of our application and to
          specify the consequences that may flow from undertaking such
          prohibited activities.
        </p>
        <ol>
          <li>
            <p className="list-heading">UNLAWFUL USE </p>
            <p>
              Our services may only be used for lawful purposes and activities.
              We prohibit any use of our website/application including the
              transmission, storage and distribution of any material or content
              using our application that violates any law or regulation of the
              Federal Republic of Nigeria. This includes:
            </p>
            <ol className="lower-alpha">
              <li>
                Any violation of local and international laws prohibiting child
                pornography; obscenity; discrimination (including racial, gender
                or religious slurs) and hate speech; or speech designed to
                incite violence or hatred, or threats to cause bodily harm.{" "}
              </li>
              <li>
                Any activity designed to defame, abuse, stalk, harass or
                physically threaten any individual in the Federal Republic of
                Nigeria or beyond its borders; including any attempt to link to,
                post, transmit or otherwise distribute any inappropriate or
                defamatory material.
              </li>
              <li>
                Any violation of Intellectual Property laws including materials
                protected by local and international copyright, trademarks and
                trade secrets. furthermore, we will not be held liable if you
                make any unlawful use of any multimedia content accessed through
                the search facility provided by our application, or otherwise
                available through access to our application, whether for
                commercial or non-commercial purposes.{" "}
              </li>
              <li>
                Any violation of the individual’s right to privacy, including
                any effort to collect personal data of third parties without
                their consent.{" "}
              </li>
              <li>
                Any fraudulent activity whatsoever, including dubious financial
                practices such as pyramid schemes; the impersonation of another
                subscriber without their consent; attempting to acquire
                sensitive information such as usernames, credit card details,
                etc. by masquerading as a trustworthy entity in an electronic
                communication (phishing); advance-fee fraud scams or any attempt
                to enter into a transaction with us on behalf of another
                subscriber without their consent.{" "}
              </li>
              <li>
                {" "}
                Any violation of the exchange control laws of the Federal
                Republic of Nigeria.{" "}
              </li>
              <li>
                Any activity that results in the sale, transmission, or
                distribution of pirated or illegal software.{" "}
              </li>
              <li>
                Failing to respond to a request by a recipient of unsolicited
                mail to be removed from any mailing or direct marketing list and
                continuing to send unsolicited mail following such a request for
                removal.
              </li>
            </ol>
            <p>
              Where any user resides outside of the Federal Republic of Nigeria,
              permanently or temporarily, such user will be subject to the laws
              of the country in which s/he is currently resident, and which
              apply. On presentation of a legal order to do so, or under
              obligation through an order for mutual foreign legal assistance,
              we will assist foreign law enforcement agencies (LEA) in the
              investigation and prosecution of a crime committed using our
              resources, including the provisioning of all personal identifiable
              data.{" "}
            </p>
          </li>
          <li>
            <p className="list-heading"> ACTION FOLLOWING BREACH OF THE AUP </p>
            <ol className="lower-alpha">
              <p>
                ​Upon receipt of a complaint or having become aware of an
                incident, we may take any of the following steps:
              </p>
              <ol className="lower-roman">
                <li>
                  ​Upon receipt of a complaint or having become aware of an
                  incident, we may take any of the following steps:
                </li>
                <li>
                  {" "}
                  In the case of application abuse, inform the user’s
                  application administrator of the incident and request the
                  application administrator or application owner to address the
                  incident in terms of this AUP and the NCC Code of Conduct;{" "}
                </li>
                <li>
                  In severe cases suspend access of the user’s entire
                  application until abuse can be prevented by appropriate means;
                </li>
                <li>
                  In the case of individual users, warn the user; suspend the
                  user’s account and/or revoke or cancel the user’s application
                  access privileges completely;{" "}
                </li>
                <li>
                  In all cases, charge the offending parties for administrative
                  costs as well as for machine and human time lost due to the
                  incident;
                </li>
                <li>
                  Assist other applications or website administrators in
                  investigating credible suspicions of any activity listed in
                  this AUP;{" "}
                </li>
                <li> Institute civil or criminal proceedings;</li>
                <li>
                  Share information concerning the incident with other Internet
                  access providers, or publish the information, and/or make
                  available the users’ details to law enforcement agencies{" "}
                </li>
              </ol>
            </ol>
          </li>
          <li>
            <p className="list-heading">PROHIBITED ACTIVITIES </p>
            <ol className="lower-alpha">
              <li>
                <p className="list-heading">THREATS TO APPLICATION SECURITY </p>
              </li>
              <p>
                Any activity which threatens the functioning, security and/or
                integrity of our application is unacceptable. This includes:{" "}
              </p>
              <ol className="lower-roman">
                <li>
                  Any efforts to attempt to gain unlawful and unauthorized
                  access to the application or circumvent any of the security
                  measures established for this goal;{" "}
                </li>
                <li>
                  Any effort to use our application to circumvent the user
                  authentication or security of any host, application or account
                  (“cracking” or “hacking”);
                </li>
                <li>
                  Forging of any TCP-IP packet header (“spoofing”) or any part
                  of the header information in an email or a newsgroup posting;{" "}
                </li>
                <li>
                  Any effort to breach or attempt to breach the security of
                  another user or attempt to gain access to any other person’s
                  computer, software, or data without the knowledge and consent
                  of such person;{" "}
                </li>
                <li>
                  Any activity which threatens to disrupt the service offered by
                  us through “denial of service attacks”; flooding of an
                  application, or overloading a service or any unauthorized
                  probes (“scanning” or “nuking”) of others’ applications;{" "}
                </li>
                <li>
                  Any activity which in any way threatens the security of the
                  application by knowingly posting, transmitting, linking to or
                  otherwise distributing any information or software which
                  contains a virus; Trojan horse; worm, lock, mail bomb,
                  cancelbot or other harmful, destructive or disruptive
                  component
                </li>
                <li>
                  Any unauthorized monitoring of data or traffic on the
                  application without our explicit, written consent.{" "}
                </li>
                <li>
                  Any unsolicited mass mailing activity including direct
                  marketing, spam and chain letters for commercial or other
                  purposes, without the consent of the recipients of those
                  mails.{" "}
                </li>
              </ol>

              <li>
                <p className="mt-3 list-heading">
                  UNSOLICITED, SPAM AND JUNK MAIL{" "}
                </p>
              </li>
              <p>
                Spam and unsolicited bulk mail are highly problematic practices.
                They affect the use and enjoyment of services by others and
                often compromise application security. We will take swift and
                firm action against any user engaging in any of the following
                unacceptable practices:{" "}
              </p>
              <ol className="lower-roman">
                <li>
                  Sending unsolicited bulk mail for marketing or any other
                  purposes (political, religious or commercial) to people who
                  have not consented to receiving such mail;
                </li>
                <li>
                  Operating or maintaining mailing lists without the express
                  permission of all recipients listed;
                </li>
                <li>
                  Failing to promptly remove from lists invalid or undeliverable
                  addresses or addresses of unwilling recipients or a recipient
                  who has indicated s/he wishes to be removed from such list;{" "}
                </li>
                <li>
                  Using our service to collect responses from unsolicited e-mail
                  sent from accounts on other Internet hosts or e-mail services,
                  that violate this AUP or the AUP of any other Internet Service
                  Provider;{" "}
                </li>
                <li>
                  Including our name in the header or by listing an IP address
                  that belongs to us in any unsolicited email whether sent
                  through our application or not;{" "}
                </li>
              </ol>

              <li>
                <p className=" mt-3 list-heading"> SPAM/VIRUS FILTERING </p>
                <ol className="lower-roman">
                  <li>
                    We provide a spam and virus filtering system to protect
                    customers from unsolicited mail and viruses. You acknowledge
                    that this system might incorrectly identify a valid message
                    as spam or as a virus and consequently this message might
                    not be delivered to you. The customer acknowledges and
                    agrees that we shall without limitation have no
                    responsibility for, or liability in respect of any data lost
                    as a result of this system.{" "}
                  </li>
                  <li>
                    We reserve the right to examine incoming or outgoing mail to
                    the extent necessary to determine if it is classified as
                    spam.{" "}
                  </li>
                </ol>
              </li>
              <li>
                <p className="mt-3 list-heading"> PROTECTION OF MINORS</p>
                <p>
                  We prohibit the use of our service to harm or attempt to harm
                  a minor, including, but not limited to, hosting, possessing,
                  disseminating, distributing or transmitting material that is
                  unlawful, including child pornography. {" "}
                </p>
              </li>
            </ol>
          </li>
        </ol>
      </div>
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

export default TermsofUse;
