<template>
    <div>
        <!-- Newsleetter -->
        <!-- <v-container class="px-0 pb-0 white dark--text" fluid>
            <v-row class="pa-2">
                <v-col md="12">
                    <div class="d-flex justify-center">
                        <v-card width="80%" flat light color="white">
                            <v-card-title class="text-center title">New Here?</v-card-title>
                            <div class="subtitle-2 grey--text pl-4">Subscribe to our news letter to get update on latest products</div>
                            <div class="px-4 mt-2 d-flex">
                                <v-text-field class="mr-10" outlined label="Email Address" prepend-inner-icon="mdi-email"></v-text-field>
                                <div class="mt-3">
                                    <v-btn color="dark" outlined>Submit</v-btn>
                                </div>
                            </div>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </v-container> -->

            <!-- Footer -->
        <v-container style="background: #424242" class="px-0 py-0" fluid>
            <v-row class="pl-12 pr-0 grey darken-4">
                <v-col md="4">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Quick Links</v-card-title>
                        <div class="footer-list-items">
                            <ul class="pl-0">
                                <li><a @click="$router.push({path: '/'})" class="grey--text text--lighten-2 font-weight-light">Home</a></li>
                                <!-- <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Pharmacy</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Shop/Order</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Book Consultations/Appointment</a></li>
                                <li><a href="#" class="grey--text text--lighten-2 font-weight-light">Loyalty Cards/Reward</a></li> -->
                            </ul>
                        </div>
                    </v-card>
                </v-col>

                <v-col md="4">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">About Us</v-card-title>
                        <div class="footer-list-items">
                            <ul class="pl-0">
                                <li>
                                    <a @click="$modal.show('terms-modal')" class="grey--text text--lighten-2 font-weight-light">Terms and Condition</a>
                                </li>
                                <li>
                                    <a @click="$modal.show('privacy-modal')"  class="grey--text text--lighten-2 font-weight-light">Privacy policy</a>
                                </li>
                            </ul>
                        </div>
                    </v-card>
                </v-col>

                <v-col md="4">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Follow Us On</v-card-title>
                        <v-card-actions class="pl-4">
                            <v-btn small dark color="blue">
                                <v-icon>mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn small dark color="#C13584">
                                <v-icon>mdi-instagram</v-icon>
                            </v-btn>
                            <v-btn small dark color="red">
                                <v-icon>mdi-youtube</v-icon>
                            </v-btn>
                            <v-btn small dark color="blue lighten-1">
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <modal 
                name="terms-modal" 
                :max-width="900" 
                :adaptive="true" :scrollable="true" 
                height="auto" transition="fade-transition">

                <v-card class="px-4" height="100%" style="height: 100%">
                    <div class="text-h5 pl-2 pt-6 pb-2 green--text taxt--darken-2 customm-caption font-weight-bold">
                        Terms and Condition
                    </div>

                    <v-card-text>
                        <!-- <div class="post-caption">
                            <doc value="../assets/terms.docx" type="office"></doc>
                            <iframe 
                                style="width: 100%; height: 75vh" class="doc" 
                                src="https://docs.google.com/gview?url=https://drive.google.com/file/d/1IS9yPeGxZZqoNU9XVH_ANVwK2dGKcMTx/&embedded=true">
                            </iframe>
                        </div> -->
                        <div class="body">
                            <div>
                                PLEASE READ THE FOLLOWING TERMS AND CONDITIONS OF USE (THE "TERMS") CAREFULLY BEFORE USING THIS WEB SITE 
                                (THE "SITE") AND OTHER WEBSITES (THE "SITES"), INCLUDING ANY SUBDOMAINS THEREOF, OR ANY RELATED SMARTPHONE 
                                OR MOBILE APPLICATIONS, OPERATED BY PURELIFE PHARMACY AND ITS AFFILIATED COMPANIES. THE TERMS GOVERN YOUR USE 
                                OF THE SITES AND ARE BINDING BETWEEN YOU AND PURELIFE PHARMACY.
                            </div>
                            <div class="py-2">
                                <h4 class="green--text text--darken-2 post-caption">1. ACCEPTANCE OF TERMS AND SUBSEQUENT AMENDMENTS</h4>
                            </div>

                            <div class="post-caption">
                                Your use of the Site constitutes your full legal acceptance of the Terms.  
                                By using the Site, you also agree to our privacy policy. IF YOU DO NOT AGREE TO THE TERMS, 
                                YOU ARE NOT AUTHORIZED TO USE THE SITE. This page, together with the documents referred to within, 
                                contain the terms and conditions (<b>"Terms and Conditions"</b>) on which Purelife Pharmacy (<b>"We", "Our", "Us" 
                                “Purelife”</b>) supply any of the products (<b>"Products"</b>) listed on Our Website www.purelifepharamcy.ng 
                                ("Our Site") to you, the customer (<b>"You", "Yours"</b>). Please read these Terms and Conditions carefully 
                                before ordering any Products from Our Site. These Terms and Conditions apply to the Contract to the 
                                exclusion of any other terms that You seek to impose or incorporate, or which are implied by trade, 
                                custom, practice of course of dealing. 

                                <p class="pt-2 post-caption">In these Terms and Conditions, the following rules apply:</p> 

                                <ul class="post-caption" style="list-type: ordered">
                                    <li>A person includes a natural person, corporate or unincorporated body (whether or not having separate legal personality).</li>
                                    <li>A reference to a statute or statutory provision is a reference to such statute or provision as 
                                        amended or re-enacted. A reference to a statute or statutory provision includes any subordinate 
                                        legislation made under that statute or statutory provision, as amended or re-enacted.
                                    </li>
                                    <li>
                                        Any phrase introduced by the terms including, include, in particular or any similar expression shall 
                                        be construed as illustrative and shall not limit the sense of the words preceding those terms.
                                    </li>
                                    <li>Any phrase introduced by the terms including, include, in particular or any similar expression shall 
                                        be construed as illustrative and shall not limit the sense of the words preceding those terms.
                                    </li>
                                </ul>
                            </div>

                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">2. INFORMATION ABOUT US</h3>
                            </div>

                            <div class="post-caption">
                                Our Site is operated by Us. We are a company established under the Federal Republic of Nigeria and 
                                registered with the Corporate Affairs Commission with Our principal place of business being located at 
                                15A Admiralty Way, Lekki Lagos, Nigeria.
                            </div>

                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">3. Your Status</h3>
                            </div>

                            <div class="pt-2 post-caption">By placing an order through Our Site, You warrant that:</div>
                            <div>
                                <ul>
                                    <li class="post-caption">You are at least 18 years of age; and</li>
                                    <li class="post-caption">You have read, understood and accept these Terms and Conditions; and</li>
                                    <li class="post-caption">You intend to enter into a legally binding contract with Us; and</li>
                                    <li class="post-caption">You are legally capable of entering into binding contracts.</li>
                                </ul>
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">4. Contract Information</h3>
                            </div>
                            <div class="post-caption">
                                4.1  After placing an order, You will receive an e-mail from Us acknowledging that We have received 
                                Your order. Your order constitutes an offer to Us to buy a Product and any acknowledgement email does 
                                not mean that Your order has been accepted by Us. All orders are subject to acceptance by Us, and We 
                                will confirm such acceptance to You by sending You an e-mail or text messages that confirms that the 
                                Product has been dispatched (the "Dispatch Confirmation").
                            </div>
                            <div class="post-caption py-2">
                                4.2  The Contract constitutes the entire agreement between the parties. You acknowledge that You have not 
                                relied on any statement, promise or representation made or given by or on behalf of Us which is not set out 
                                in the Contract.
                            </div>
                            <div class="post-caption py-2">
                                4.3  The Contract will relate only to those Products whose dispatch We have confirmed (pursuant to 
                                this clause 4) in the Dispatch Confirmation. We will not be obliged to supply any other Products which 
                                may have been part of Your order until the dispatch of such Products has been confirmed in a separate 
                                Dispatch Confirmation.
                            </div>
                            <div class="post-caption py-2">
                                4.4  Any samples, drawings, descriptive matter or advertising produced by Us and any descriptions or 
                                illustrations contained on Our Site are produced for the sole purpose of giving an approximate idea of 
                                the Products described in them. They shall not form part of the Contract or have any contractual force.
                            </div>
                            <div class="post-caption py-2">
                                4.5  We reserve the right to amend our Products if reasonable, or required by any applicable statutory or regulatory 
                                requirements.
                            </div>
                            <div class="post-caption py-2">
                                4.6  If Your order contains an order for Medicines Complete, you must also comply with the terms and 
                                conditions for Medicines Complete.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">5. LINKS FROM THE WEBSITE</h3>
                            </div>
                            <div class="py-2 post-caption">
                                5.1  Please note that in some cases, We accept orders as agents on behalf of third party sellers. The 
                                resulting legal contract is between You and that third party seller, and as such, is subject to the terms 
                                and conditions of that third party seller.
                            </div>
                            <div class="py-2 post-caption">
                                5.2  We may also provide links on Our Site to the websites of other companies, whether affiliated with Us or 
                                not. <b> We cannot give any undertakings that the products You purchase from third party sellers through Our Site, 
                                or from companies to whose website We have provided a link on Our Site, are of satisfactory quality or fit for 
                                purpose, and any such warranties are expressly DISCLAIMED by Us absolutely </b>. This DISCLAIMER does not affect your 
                                statutory rights against the third party seller and you grant Us express permission to disclose your customer 
                                information related to that transaction to the third party seller.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    6. ACCURACY; LIMITATION OF LIABILITY AND EXCLUSION OF WARRANTIES
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                Purelife makes commercially reasonable efforts to ensure that all information contained on the Site is 
                                accurate and up to date. Nevertheless, you must evaluate the information and content of the Sites. 
                                Your use and browsing of the Site is exclusively at your own risk and the Site is provided to you AS-IS 
                                WITHOUT WARRANTY OF ANY KIND. PURELIFE MAKES NO WARRANTIES, EXPRESS OR IMPLIED, WITH RESPECT TO THE USE OF 
                                THE SITE AND THE MATERIALS CONTAINED HEREIN. PURELIFE EXPRESSLY DISCLAIMS ANY EXPRESS OR IMPLIED WARRANTY, 
                                INCLUDING BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                                QUIET ENJOYMENT OR NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. 
                                PURELIFE DOES NOT WARRANT THAT (A) THE WEBSITE WILL BE ERROR-FREE, UNINTERRUPTED OR SECURE, (B) DEFECTS WILL 
                                BE CORRECTED, (C) YOUR USE OF THE SITE WILL MEET YOUR REQUIREMENTS, OR (D) ANY CONTENT OR INFORMATION ON THE 
                                SITE IS CORRECT, RELIABLE, CURRENT OR COMPLETE.
                            </div>
                            <div class="py-2 post-caption">
                                PURELIFE ALSO EXPRESSLY DISCLAIMS ANY LIABILITY FOR ANY DAMAGE TO OR VIRUSES THAT MAY INFECT YOUR COMPUTER 
                                EQUIPMENT OR OTHER PROPERTY AS YOU ACCESS OR BROWSE THE SITE OR DOWNLOAD MATERIAL FROM THE SITE.
                            </div>
                            <div class="py-2 post-caption">
                                UNDER NO CIRCUMSTANCES SHALL PURELIFE, ITS SUBSIDIARIES, AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, 
                                EMPLOYEES OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES WHETHER IN AN ACTION 
                                IN CONTRACT OR TORT (INCLUDING NEGLIGENCE AND STRICT LIABILITY) RESULTING FROM ITS PERFORMANCE OR ANY FAILURE TO PERFORM 
                                UNDER THE TERMS EVEN IF PURELIFE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    7. INTELLECTUAL PROPERTY RIGHTS
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                7.1  Intellectual Property Rights ("Intellectual Property Rights") means all patents, 
                                rights to inventions, utility models, copyright and related rights, trademarks, service marks, 
                                trade, business and domain names, rights in trade dress or get-up, rights in goodwill or to sue 
                                for passing off, unfair competition rights, rights in designs, rights in computer software, 
                                database right, topography rights, moral rights, rights in confidential information 
                                (including know-how and trade secrets), logo, product and service names, designs and slogans 
                                and any other intellectual property rights, in each case whether registered or unregistered and 
                                including all applications for and renewals or extensions of such rights, and all similar or 
                                equivalent rights or forms of protection in any part of the world.
                            </div>
                            <div class="py-2 post-caption">
                                7.2  All Intellectual Property Rights in or arising out of or in connection with Our Products shall 
                                be owned by Us exclusively, you must not use such Marks without the prior written consent of the 
                                Company.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    8. INDEMNIFICATION
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                You agree to indemnify, defend, and hold Purelife, its subsidiaries, its affiliates, or their 
                                respective officers, directors, employees, suppliers, licensors and agents (and its and their 
                                successors, officers, directors and employees) harmless from and against any and all claims, 
                                demands, costs, liabilities, judgments, losses, expenses and damages (including attorneys' fees) 
                                arising out of or relating to (a) your use of the Site; and (b) a violation of these Terms of Use.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    9. REFUND POLICY
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                Once product is received by the consumer, you shall not be able to cancel the Contract.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    10. AVAILABILITY AND DELIVERY
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                Your order will be fulfilled by the delivery date set out in the Dispatch Confirmation, or, if no delivery 
                                date is specified, then within 30 days of the date of the Dispatch Confirmation, unless exceptional 
                                circumstances arises
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    11. RISK AND TITLE
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                11.1  The risk in the Products shall pass to You on completion of delivery.
                            </div>
                            <div class="py-2 post-caption">
                                11.2  Title to the Products shall not pass to You until We have received payment in full (in cash or 
                                cleared funds) for the Products; and any other products or services that We have supplied to You in 
                                respect of which payment has become due.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    12. PRICE AND PAYMENT
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                12.1  The price of the Products shall be the price set out in the order, or, if no price is quoted, the 
                                price set out in Our published price list in force as at the date of delivery.
                            </div>
                            <div class="py-2 post-caption">
                                12.2  We may, by giving notice to You at any time up to 5 days before delivery, increase the price of 
                                the Products to reflect any increase in the cost of the Products that is due to:
                            </div>
                            <div class="py-2 post-caption">
                                12.2.1 any factor beyond Our control (including foreign exchange fluctuations, increases in taxes and 
                                duties, and increases in labour, materials and other manufacturing costs);
                            </div>
                            <div class="py-2 post-caption">
                                12.2.2 any request by You to change the delivery date, quantities or types of Products ordered; or
                            </div>
                            <div class="py-2 post-caption">
                                12.2.3 any delay caused by any of Your instructions or failure by You to give Us adequate or accurate information or instructions.
                            </div>
                            <div class="py-2 post-caption">
                                12.3 The price of the Products are exclusive of the costs and charges of transport of the Products, which shall be invoiced to You.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    13. LIMITATIONS AND LIABILITY
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                UNDER NO CIRCUMSTANCES SHALL PURELIFE BE LIABLE FOR ANY DAMAGES, LOSS, OR EXPENSE OF ANY 
                                KIND ARISING OUT OF OR RESULTING FROM YOUR USE OR INABILITY T0 USE THE WEBSITES OR ANY WEBSITE 
                                LINKED TO THEM, IN WHOLE OR IN PART, REGARDLESS OF WHETHER SUCH LIABILITY IS BASED IN TORT, 
                                CONTRACT, OR OTHERWISE. IN NO EVENT, INCLUDING WITHOUT LIMITATION A NEGLIGENT ACT, SHALL PURELIFE 
                                BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES 
                                (INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, LOSS OR CORRUPTION OF DATA, LOSS OF GOODWILL, WORK 
                                STOPPAGE, COMPUTER FAILURE OR MALFUNCTION, OR INTERRUPTION OF BUSINESS), ARISING OUT OF OR IN ANY WAY 
                                RELATED TO THE SITES, REGARDLESS OF WHETHER ANY PURELIFE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF 
                                SUCH DAMAGES. SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF WARRANTIES OR DAMAGES SO THE 
                                ABOVE DISCLAIMER MAY NOT APPLY TO THE EXTENT SUCH JURISDICTION'S LAW APPLIES TO THESE TERMS.
                            </div>
                            <div class="py-2 post-caption">
                                13.2.1 We shall under no circumstances whatsoever be liable to You, whether in contract, tort 
                                (including negligence), breach of statutory duty, or otherwise, for any loss of profit, or any 
                                indirect or consequential loss arising under or in connection with the Contract; and
                            </div>
                            <div class="py-2 post-caption">
                                13.2.2 Our total liability to You in respect of all other losses arising under or in connection with the 
                                Contract, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, shall 
                                in no circumstances exceed the total price of the relevant Products purchased by You.
                            </div>
                            <div class="py-2 post-caption">
                                13.2.3 Where You buy any Product from a third party seller through Our Site, the seller's individual 
                                liability will be set out in the seller's terms and conditions.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    14. STATUTE OF LIMITATIONS
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                You agree that regardless of any statute or law to the contrary, any claim or cause of action arising 
                                out of or related to use of the Site or the Terms must be filed within one (1) year after such claim or 
                                cause of action arose or be forever barred.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    15. YOUR ACCOUNT
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                If you use the Site, you are responsible for maintaining the confidentiality of your account and 
                                password and for restricting access to your computer, and you agree to accept responsibility for 
                                all activities that occur under your account or password. Purelife reserves the right to refuse 
                                service, terminate accounts, remove or edit content, or cancel orders in their sole discretion.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    16. RESTRICTIONS ON CONTENT AND SITE
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                You agree that you will not, nor will you permit any third party to do any of the following while 
                                accessing or using the Site: (a) use the Site for any purposes not expressly provided for in this 
                                Terms of Use; (b) scan, probe, or test the vulnerability of any system or network or breach or 
                                circumvent any security or authentication measures; (c) interfere with, disrupt, or damage the Site 
                                or access of any user, host, or network, including without limitation, sending a virus; cancel bots; 
                                Trojan horses; overloading, flooding, spamming, mail-bombing the Site, or by scripting the creation of 
                                content in such a manner as to interfere with or create an undue burden on the Site; or similar methods 
                                or technology; (d) use our communication tools to send spam; and (e) engage in conduct that is illegal 
                                in any way.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    17. FORCE MAJEURE
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                17.1    Neither party shall be liable for any failure or delay in performing its obligations under the 
                                Contract to the extent that such failure or delay is caused by a Force Majeure Event. A Force Majeure 
                                Event means any event beyond a party's reasonable control, which by its nature could not have been 
                                foreseen, or, if it could have been foreseen, was unavoidable, including strikes, lock-outs or other 
                                industrial disputes (whether involving its own workforce or a third party's), failure of energy sources 
                                or transport network, acts of God, war, terrorism, riot, civil commotion, interference by civil or 
                                military authorities, national or international calamity, armed conflict, malicious damage, breakdown 
                                of plant or machinery, nuclear, chemical or biological contamination, sonic boom, explosions, collapse 
                                of building structures, fires, floods, storms, earthquakes, loss at sea, epidemics or similar events, 
                                natural disasters or extreme adverse weather conditions, or default of suppliers or subcontractors.
                            </div>
                            <div class="py-2 post-caption">
                                17.2    Performance under the Contract that is subject to a Force Majeure Event is deemed to be suspended 
                                for the period that the Force Majeure Event continues, and an extension of time for performance for the 
                                duration of that period applies. Parties must make reasonable efforts to bring the effects of the Force 
                                Majeure Event to a conclusion.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    18. WAIVER
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                18.1  A waiver of any right or remedy under the Contract is only effective if given in writing and 
                                shall not be deemed a waiver of any subsequent breach or default. No failure or delay by a party to 
                                exercise any right or remedy provided under the Contract or by law shall constitute a waiver of that or 
                                any other right or remedy, nor shall it preclude or restrict the further exercise of that or any other 
                                right or remedy. No single or partial exercise of such right or remedy shall preclude or restrict the 
                                further exercise of that or any other right or remedy.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    19. VARIATION
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                19.1  We have the right to revise and amend these Terms and Conditions as required from time to time.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    20. NOTICES
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                20.1  We may give notice to You at either the e-mail or postal address You provide to Us when placing an 
                                order. Notice will be deemed received and properly served immediately when posted on Our website, 
                                24 hours after an e-mail is sent, or three days after the date of posting of any letter. In proving the 
                                service of any notice, it will be sufficient to prove, in the case of a letter, that such letter was 
                                properly addressed, stamped and placed in the post and, in the case of an e-mail, proof that such e-mail 
                                was sent to the specified e-mail address of the addressee.
                            </div>
                            <div class="py-2 post-caption">
                                20.2  The provisions of this clause 20 shall not apply to the service of any proceedings or other 
                                documents in any legal action.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    21. TEXT MESSAGES
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                If You have opted in to receive text messages from us at Purelife, the following terms and conditions apply:
                            </div>
                            <div>
                                <ul>
                                    <li class="post-caption">You may text STOP at any time to stop receiving messages from us</li>
                                    <li class="post-caption">You may text HELP at anytime to receive information on how to access customer support or may email support@purelife.com</li>
                                    <li class="post-caption">Messages and Data Rates may apply to any messages you send or receive from us</li>
                                </ul>
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    22. IMPORT DUTY
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                22.1  If You order Products from Our Site for delivery outside the Federal Republic of Nigeria, they may 
                                be subject to import duties and taxes which are levied when the delivery reaches the specified destination. 
                                You will be responsible for payment of any such import duties and taxes, as We accept no such liability.  
                            </div>
                            <div class="py-2 post-caption">
                                22.2  You must comply with all applicable laws and regulations of the country for which the products 
                                are destined. We are not liable for any breach by You of any such laws.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    23. WRITTEN COMMUNICATION
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                23.1  Applicable laws require that some of the information or communications We send to You be in writing. 
                                When using Our Site, You accept that communication with Us will be mainly electronic. We will contact You 
                                by e-mail or text or provide You with information by posting notices on Our website. By entering into this 
                                Contract, You agree to this electronic means of communication and You acknowledge that all contracts, 
                                notices, information and other communications that We provide to You electronically comply with any legal 
                                requirement that such communications be in writing. This condition does not affect Your statutory rights.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    24. SEVERENCE
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                24.1  If a court or any other competent authority finds that any provision of the Contract 
                                (or part of any provision) is invalid, illegal or unenforceable, that provision or part-provision shall, 
                                to the extent required, be deemed deleted, and the validity and enforceability of the other provisions of 
                                the Contract shall not be affected.
                            </div>
                            <div class="py-2 post-caption">
                                24.2  If any invalid, unenforceable or illegal provision of the Contract would be valid, 
                                enforceable and legal if some part of it were deleted, the provision shall apply with the minimum 
                                modification necessary to make it legal, valid and enforceable.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    25. THIRD PARTY RIGHTS
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                A person who is not a party to the Contract shall not have any rights under or in connection with it.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    26. GOVERNING LAW AND JURISDICTION
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                The Contract, and any dispute or claim arising out of or in connection with it or its subject matter or 
                                formation (including non-contractual disputes or claims), shall be governed by, and construed in 
                                accordance with the Law of the Federal Republic of Nigeria and the parties irrevocably submit to the 
                                exclusive jurisdiction of the courts in Nigeria.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    27. HOW WE MAY USE YOUR PERSONAL INFORMATION 
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                We will only use your personal information as set out in our privacy policy 
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    28. CONTACTING PURELIFE PHARMACY 
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                If you have any suggestions, comments, and/or questions about the Site and/or these Terms of Use, please contact Us at info@purelife.com
                            </div>
                            <div class="text-right">
                                <v-btn color="red darken-2" @click="$modal.hide('terms-modal')" class="white--text">Close</v-btn>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </modal>

           <modal 
                name="privacy-modal" 
                :max-width="900" 
                :adaptive="true" :scrollable="true" 
                height="auto" transition="fade-transition">

                <v-card class="px-4" height="100%" style="height: 100%">
                    <div class="text-h5 pl-2 pt-6 pb-2 green--text taxt--darken-2 customm-caption font-weight-bold">
                        Privacy Policy
                    </div>

                    <v-card-text>
                        <div class="body">
                            <div class="py-2">
                                <h4 class="green--text text--darken-2 post-caption">1.0 INTRODUCTION?</h4>
                            </div>

                            <div class="post-caption py-2">
                                Our pharmacy respects the privacy rights of our customers and employees and is committed to protecting the personal 
                                information that we collect from you. We have adopted this Privacy Policy to guide how we collect, use and disclose the 
                                information you provide to us. Our Practices complies with the data protection rules and guiding principles set out in the 
                                Nigeria Data Protection Regulations 2019 (NDPR. Generally, this legislation applies to the collection, use and disclosure 
                                of personal information in the course of commercial activities, including pharmacy services and retail stores. 
                                This legislation may apply to information we currently have on record and have always collected, used and disclosed to 
                                provide our customers with pharmacy services. 
                            </div>
                            <div class="post-caption py-2">
                                We reserve the right to disable any user identification code or password whether chosen or allocated by us at any time 
                                If in our opinion you have failed to comply with any of the provisions of these conditions.
                            </div>
                            <div class="py-2">
                                <h4 class="green--text text--darken-2 post-caption">2.0 WHAT PERSONAL DATA IS COLLECTED?</h4>
                            </div>

                            <div class="post-caption">
                                When you use our website, any service we provide or in your interaction with us, the personal data we may collect 
                                includes:-
                            </div>

                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">2. INFORMATION ABOUT US</h3>
                            </div>

                            <div class="post-caption">
                                (a) <b> Data collected directly from you. </b> This may be done through this website, over the phone, by email, 
                                or in-person when you meet our staff or representatives. The data collected may include, but is not limited 
                                to:
                                • your contact information, including your (first and last) name, (billing and/or delivery) address, 
                                birthdate, and email address and, optionally, your telephone number. We need your e-mail address and 
                                (optionally) telephone number so that we may contact you if we have questions or information for you 
                                regarding your order or the service that we are providing or will provide to you;
                            </div>

                            <div class="post-caption">
                                • other information required to be able to process your order or to provide you with the service, such as information 
                                concerning the products you have ordered or the service we are providing to you, the billing and/or delivery address, 
                                banking and/or credit card details;
                            </div>
                            <div class="post-caption py-2">
                                • if you have created an online profile or account, the preferences and interests stored in such profile or account; 
                                and
                            </div>
                            <div class="post-caption py-2">
                                • if you have contacted customer service, the details of this contact and the contact history.
                            </div>
                            <div class="post-caption py-2">
                                (b) Data collected by automated means. Various technologies may be used on our website to make it more 
                                user-friendly, effective and secure. Such technologies may lead to data being collected automatically by us 
                                or by third parties on behalf of us. 
                            </div>
        
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    3.0 WHAT DO WE DO WITH YOUR INFORMATION?
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                We use your personal data to serve you. This includes, where applicable:-
                            </div>
                            <div>
                                <ul>
                                    <li class="post-caption">
                                        providing you with the products and services that you have requested e.g. notifying you regarding the 
                                        status of your order or delivery
                                    </li>
                                    <li class="post-caption">ensuring that your transactions on our websites are safe and secure;</li>
                                    <li class="post-caption">providing you with a convenient shopping experience;</li>
                                    <li class="post-caption">contacting you for feedback after a sale of a product or service; and</li>
                                    <li class="post-caption">
                                        resolving any problems or disputes you may encounter concerning our products and
                                    </li>
                                </ul>
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    4.0 HOW WE COLLECT PERSONAL INFORMATION
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                We collect information about you and any other party whose details you provide to us when you:
                            </div>
                            <div>
                                <ul>
                                    <li class="post-caption">
                                        To improve our Site through feedback you provide on our products and services;
                                    </li>
                                    <li class="post-caption">Complete online forms.</li>
                                    <li class="post-caption">Take part in surveys</li>
                                    <li class="post-caption">Interact with us using our social media platforms</li>
                                    <li class="post-caption">
                                        Download and register on our online application 
                                    </li>
                                    <li class="post-caption">
                                        Contact us offline, for example by telephone, SMS, email, post or any other means of communication;
                                    </li>
                                    <li class="post-caption">
                                        Access and use any of our websites or portals from your devices (including mobile devices) and 
                                        applications; and
                                    </li>
                                    <li class="post-caption">
                                        Share information with third parties that are entitled to share that information, but in each case 
                                        as permitted by applicable laws.
                                    </li>
                                    <li class="post-caption">Employee engagement personal data forms (inclusive of medical report)</li>
                                    <li class="post-caption">Third parties data collection source:</li>
                                    <li class="post-caption">Credit reference agencies including credit ratings.</li>
                                    <li class="post-caption">Medical professionals and hospitals</li>
                                </ul>
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    5.0 THIRD-PARTY COOKIES
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                Our website uses cookies provided by trusted third-party such as Google Analytics, 
                                which is one of the most widespread and trusted analytics solutions on the web. This helps us to 
                                understand how You use the site and ways that We can improve Your experience.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    6.0 CONSENT
                                </h3>
                            </div>
                            <div class="py-2 post-caption"><i>How do you get my consent?</i></div>
                            <div class="py-2 post-caption">
                                When you provide us with personal information to complete a transaction, verify your credit card, 
                                place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting 
                                it and using it for that specific reason only.
                                If we ask for your personal information for a secondary reason, like marketing, 
                                we will either ask you directly for your expressed consent, or provide you with 
                                an opportunity to say no.
                            </div>
                            <div class="py-2 post-caption"><i>How do i withdraw my consent?</i></div>
                            <div class="py-2 post-caption">
                                If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, 
                                for the continued collection, use or disclosure of your information, at any time, by contacting us at 
                                feedback@purelifepharmacy.ng 
                                If you have consented, your personal data may be used by us for marketing products and services offered on 
                                the website or other products or services offered by Purelife Pharmacy (e.g. informing you of the latest 
                                activities, special offers, promotions or sending you newsletters).
                                If we need to use your personal data for any other purposes, we will notify you and obtain your consent 
                                beforehand. You will be allowed to withhold or withdraw your consent for the use of your personal data for 
                                any purposes.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    7.0 DICLOSURE
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                We will not sell your personal data to third parties. Your personal data may be disclosed and shared 
                                within Purelife Pharmacy Ltd to allow us to provide the products and services which you have requested.
                                We may disclose or share your personal data with third parties who provide necessary services to us, such as:-
                            </div>
                            <div>
                                <ul>
                                    <li class="post-caption">
                                        service providers and data processors working on our behalf and providing services such as hosting and 
                                        maintenance services, analysis services, e-mail messaging services, delivery services, handling of 
                                        payment transactions, solvency check and address check, etc; and
                                    </li>
                                    <li class="post-caption">our consultants and professional advisers (such as accountants, lawyers, auditors).</li>
                                </ul>
                            </div>
                            <div class="py-2 post-caption">
                                We will also disclose your personal data to third parties to comply with legal obligations or industry 
                                requirements. This includes disclosures to legal, regulatory, governmental, tax, and law enforcement 
                                authorities.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    8.0 THIRD-PARTY SERVICES
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                In general, the third-party providers used by us will only collect, use and disclose your information to 
                                the extent necessary to allow them to perform the services they provide to us. <br>
                                However, certain third-party service providers, such as payment gateways and other payment transaction 
                                processors, have their privacy policies concerning the information we are required to provide to them for 
                                your purchase-related transactions. <br>
                                For these providers, we recommend that you read their privacy policies so you can understand how your personal 
                                information will be handled by these providers.
                                In particular, remember that certain providers may be located in or have facilities that are located in a 
                                different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves 
                                the services of a third-party service provider, then your information may become subject to the laws of 
                                the jurisdiction(s) in which that service provider or its facilities are located.
                                <br>
                                Once you leave our store’s website or are redirected to a third-party website or application, you are no 
                                longer governed by this Privacy Policy or our website’s Terms of Service.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    9.0 SOCIAL NETWORKS
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                Our website and mobile or web-based applications may provide you with social plug-ins from various social 
                                networks (such as Facebook and Instagram). If you choose to interact with a social network, your activity 
                                on our website will also be made available to social networks such as Facebook and Instagram. <br>
                                If you are logged in on one of the social networks during the visit of our website, the social network 
                                might add this information to your profile. If you are interacting with one of the social plug-ins, this 
                                information will be transferred to the social network. In case you do not wish such a data transfer, please 
                                log off on your social network before you enter our website. <br>
                                We cannot influence this data collection and data transfer via the social plug-ins. 
                                Please read the privacy policies of those social networks for detailed information about the collection 
                                and transfer of personal data, what rights you have, and how you can achieve satisfactory privacy 
                                settings.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    10.0 SECURITY
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                We are committed to ensuring that Your information is secure. In order to prevent unauthorised access or 
                                disclosure, We have put in place reasonable physical, electronic and managerial procedures to safeguard 
                                and secure the information We collect online. <br>
                                In particular, We adopt appropriate data collection, storage and processing practices and security measures 
                                to protect against unauthorized access, alteration, disclosure or destruction of Your personal transaction 
                                information and data stored on our Site. <br>
                                Sensitive and private data exchange between the Site and its Users happens over a secured 
                                communication channel and is encrypted and protected. Transactions are also handled over a secure 
                                payment gateway. Also, the Pharmacy has implemented appropriate technical, physical and organisational 
                                measures designed to protect personal information against accidental or unlawful destruction, 
                                accidental loss, damage, alteration, unauthorised disclosure or access, as well as all other forms of 
                                unlawful processing.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    11.0 YOUR RIGHTS AS A DATA SUBJECT
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                                At any point while we are in possession of or processing your personal data, You, the data subject, have the following rights: <br>
                                > Right of Access – You have the right to request a copy of the information that We hold about you <br>
                                > Right of Rectification – You have a right to correct data that We hold about You that is inaccurate or incomplete <br>
                                > Right to be Erased/Forgotten – In certain circumstances You can ask for the data We hold about You to be erased from our records <br>
                                > Right to Restriction of Processing – Where certain conditions apply to have a right to restrict the processing <br>
                                > Right of Portability – You have the right to have the data We hold about you transferred to another organisation (to be reused for Your own purposes) <br>
                                > Right to Object – You have the right to object to certain types of processing such as direct marketing <br>
                                > Right to Object to automated processing, including profiling – You also have the right to be subject to the legal effects of automated processing or profiling <br>
                                > Right to Withdraw – You have the right to withdraw Your consent at any time <br>
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    12.0 AGE OF CONSENT
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                               By using this site, you represent that you are at least the age of majority in your state or province of 
                               residence, or that you are the age of majority in your state or province of residence and you have given 
                               us your consent to allow any of your minor dependents to use this site.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    13.0 CHANGES TO THIS PRIVACY POLICY
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                               We reserve the right to modify this privacy policy at any time, so please review it frequently. 
                               Changes and clarifications will take effect immediately upon their posting on the website. If we make 
                               material changes to this policy, we will notify you here that it has been updated, so that you are aware 
                               of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose 
                               it. <br>
                                If our store is acquired or merged with another company, your information may be transferred to the new 
                                owners so that we may continue to sell products to you.

                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    14.0 COMPLIANCE WITH THE REGULATORS
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                               This Privacy Policy is in line with the provisions of Nigeria Data Protection Regulation, 2019 
                               (Regulation), a regulation which describes how organisations including Purelife Pharmacy must collect, 
                               handle and store personal information and applies regardless of whether data is stored electronically, 
                               on paper or on other materials.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    15.0 GOVERNING LAW
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                               This Policy is governed by the laws of the Federal Republic of Nigeria . You agree to submit to the 
                               exclusive jurisdiction of the Courts of the Federal Republic of Nigeria in any dispute relating to this 
                               Policy.
                            </div>
                            <div class="py-2">
                                <h3 class="green--text text--darken-2 post-caption">
                                    18.0 QUESTIONS AND CONTACT INFORMATION
                                </h3>
                            </div>
                            <div class="py-2 post-caption">
                               If you would like to: access, correct, amend or delete any personal information we have about you, register 
                               a complaint, or simply want more information contact us at support@purelifepharmacy.ng
                            </div>
                            <div class="text-right">
                                <v-btn color="red" @click="$modal.hide('privacy-modal')" class="white--text">Close</v-btn>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </modal>


            <!-- <v-row class="pl-12 pr-0 grey darken-4">
                <v-col md="4" class="pt-0">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Follow Us On</v-card-title>
                        <v-card-actions class="pl-4">
                            <v-btn small dark color="blue">
                                <v-icon>mdi-facebook</v-icon>
                            </v-btn>
                            <v-btn small dark color="#C13584">
                                <v-icon>mdi-instagram</v-icon>
                            </v-btn>
                            <v-btn small dark color="red">
                                <v-icon>mdi-youtube</v-icon>
                            </v-btn>
                            <v-btn small dark color="blue lighten-1">
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col md="3" class="pt-0">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Contact Us</v-card-title>
                        <v-card-text class="grey--text text--lighten-1">01 888 1100 / 0700 600 0000</v-card-text>
                    </v-card>
                </v-col>

                <v-col md="5" class="pt-0">
                    <v-card flat color="grey darken-4 white--text">
                        <v-card-title class="subtitle-2 font-weight-bold">Payment Methods And Delivery Partners</v-card-title>
                    </v-card>
                </v-col>
            </v-row> -->
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
        
    })
}
</script>

<style lang="scss" scoped>
    .post-caption {
        font-family: light-font(family) !important;
        font-weight: 100 !important;
    }
    .customm-caption {
        font-family: light-font(family) !important;
        font-weight: 100 !important;
        font-size: 20px;
    }
    .footer-list-items {
        padding-left: 15px;
        font-size: small;

        ul {
            list-style-type: none;
            li a {
                text-decoration: none;
            }

            li a:hover {
                text-decoration: underline
            }
        }
    }
</style>