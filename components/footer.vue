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
                :min-width="800" :max-width="900" 
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
                        </div>
                    </v-card-text>
                </v-card>
            </modal>

           <modal 
                name="privacy-modal" 
                :min-width="800" :max-width="900" 
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

                            <!-- <div class="py-2 post-caption">
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
                            </div> -->
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