import Faq from "react-faq-component";

const FaqData = {
    rows: [
        {
            title: "What is Codo Finance?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis." 
        },
        {
            title: "What benefits do CODO token holders have?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis." 
        },
        {
            title: "How do I buy CODO tokens?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis." 
        },
        {
            title: "Can I stake my CODO tokens immediately after purchase?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis." 
        },
        {
            title: "What kind of Al tools does Codo Finance use?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis." 
        },
        {
            title: "When will the token launch?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. Fusce sed commodo purus, at tempus turpis." 
        },
    ]
}

const FaqStyles = {
    bgColor: '#030303',
    titleTextColor: '#F5A11E',
    rowTitleTextSize: '16px',
    rowTitleColor: 'white',
    rowContentTextSize: '16px',
    rowContentColor: 'white',
    arrowColor: 'white',
    rowContentPaddingTop: '10px',
    rowContentPaddingBottom: '10px',
}

const Faqs = () => {
    return (
        <section id="faq">
            <div className="container m-auto">
                <div className="container-header pb-10">
                    <div className="title">FAQs</div>
                </div>
                <div className="container-body">
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-10 lg:gap-0">
                        <div className="px-10">
                            <Faq 
                                data={FaqData}
                                styles={FaqStyles}
                            />
                        </div>
                        <div className="px-10">
                            <div className="subtitle">Haven't found the right help?</div>
                            <div>
                                <p>We're here to help! Reach out via chat, email, or phone.</p>
                                <form
                                    // action={FORM_ENDPOINT}
                                    // onSubmit={handleSubmit}
                                    method="POST"
                                >
                                    <div className="pt-0 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            className="relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="pt-0 mb-3">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            className="relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="pt-0 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Subject"
                                            name="subject"
                                            className="relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="pt-0 mb-3">
                                        <textarea
                                            placeholder="Enter your message here"
                                            name="message"
                                            className="relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 border-0 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="pt-0 mb-3 flex justify-end">
                                        <button
                                            className="btn flex gap-2 justify-end"
                                            type="submit"
                                        >
                                            Contact Us <img src="/assets/images/icons/ArrowRight.png" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Faqs;