import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#020D07]">
            {/* Header */}
            <header className="px-12 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="flex items-center gap-1">
                            <Link href="/">
                                <div className="w-8 h-8">
                                    <Image 
                                        src="/images/logo-icon.svg" 
                                        alt="CodeMentor AI Logo" 
                                        width={32} 
                                        height={32}
                                    />
                                </div>
                            </Link>
                            <Link href="/">
                                <h1 className="text-[28px] font-bold text-[#60AC84] font-sans leading-none tracking-tighter">CodeMentor AI</h1>
                            </Link>
                        </div>
                        
                        {/* Navigation Links */}
                        <div className="flex ml-[50px]">
                            <div className="flex items-center gap-[36px]">
                                <Link href="/">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[15px] font-medium text-[#D7E4DD]">Features</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="#D7E4DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </Link>
                                <Link href="/">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[15px] font-medium text-[#D7E4DD]">Integrations</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="#D7E4DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </Link>
                                <Link href="/">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[15px] font-medium text-[#D7E4DD]">Pricing</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="#D7E4DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </Link>
                                <Link href="/">
                                    <div className="flex items-center gap-1">
                                        <span className="text-[15px] font-medium text-[#D7E4DD]">Contact</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="#D7E4DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side Buttons */}
                    <div className="flex items-center gap-[36px]">
                        <Link href="/">
                            <span className="text-[15px] font-medium text-[#D7E4DD]">Download app</span>
                        </Link>
                        <div className="w-[1px] h-[20px] bg-[rgba(145,182,162,0.2)]"></div>
                        <Link href="/Login">
                            <span className="text-[15px] font-medium text-[#D7E4DD]">Log in</span>
                        </Link>
                        <Link href="/register">
                            <div className="bg-[#14AE5C] px-[18px] py-[8px] rounded-[16px]">
                                <span className="text-[15px] font-medium text-[#020302]">Try it free</span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-[rgba(145,182,162,0.2)] mt-4"></div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="px-24 pt-24 pb-0">
                    <div className="flex flex-col items-center gap-32">
                        <div className="flex flex-col items-center gap-24 w-full">
                            <h1 className="text-[120px] font-semibold text-[#D7E4DD] text-center leading-none tracking-tighter">
                                Revolutionize Your Coding Experience with AI
                            </h1>
                            <Link href="/">
                                <button className="bg-[#14AE5C] px-7 py-3 rounded-[16px]">
                                    <span className="text-[20px] font-medium text-[#020302]">Get Started</span>
                                </button>
                            </Link>
                        </div>

                        <div className="w-full flex justify-center">
                            <div className="relative w-[1000px] h-[700px] border border-[rgba(145,182,162,0.2)] rounded-[20px] shadow-lg overflow-hidden bg-gradient-to-br from-black to-[rgba(0,84,173,0.16)]">
                                <div className="flex flex-row justify-between px-8 py-4">
                                    <div className="flex">
                                        <div className="w-12 h-12">
                                            <Image 
                                                src="/images/hero-logo-icon.svg" 
                                                alt="CodeMentor AI Logo" 
                                                width={48} 
                                                height={48}
                                            />
                                        </div>
                                        <h2 className="text-[42px] font-bold text-[#60AC84] font-sans leading-none tracking-tighter">CodeMentor AI</h2>
                                    </div>
                                    
                                    <div className=" ">
                                        <Link href="/">
                                            <button className="bg-[#14AE5C] px-4 py-3 rounded-[16px] flex items-center">
                                                <span className="text-[20px] font-medium text-[#020302]">Explore Solutions</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex flex-row px-8 h-[572px] mb-2 gap-x-8">
                                    <div className='w-2/3 flex flex-col flex-1 h-full gap-y-8'>
                                        <div className='w-full flex flex-row h-full bg-[#15201A] rounded-xl'></div>
                                        <div className='w-full flex flex-row h-full bg-[#15201A] rounded-xl'></div>
                                    </div>
                                    <div className='w-1/3 flex flex-col h-full bg-[#15201A] rounded-xl'></div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-24 py-16 pt-[66px] pb-24">
                    <h2 className="text-[48px] font-semibold text-[#D7E4DD] mb-7 tracking-tighter">Why Choose CodeGenie?</h2>
                    
                    <div className="grid grid-cols-3 gap-7 mb-7">
                        <div className="bg-[rgba(184,224,203,0.12)] rounded-[20px] p-9 flex flex-col gap-7 h-[250px]">
                            <div className="w-8 h-8">
                                <Image
                                    src="/images/code-icon.svg"
                                    alt="Code Icon"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <p className="text-[24px] text-[#D7E4DD] font-normal leading-[1.33] tracking-tighter">Generate code snippets in seconds.</p>
                        </div>
                        <div className="bg-[rgba(184,224,203,0.12)] rounded-[20px] p-9 flex flex-col gap-7 h-[250px]">
                            <div className="w-8 h-8">
                                <Image
                                    src="/images/attachment-icon.svg"
                                    alt="Attachment Icon"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <p className="text-[24px] text-[#D7E4DD] font-normal leading-[1.33] tracking-tighter">Integrate with your favorite tools.</p>
                        </div>
                        <div className="bg-[rgba(184,224,203,0.12)] rounded-[20px] p-9 flex flex-col gap-7 h-[250px]">
                            <div className="w-8 h-8">
                                <Image
                                    src="/images/heart-icon.svg"
                                    alt="Heart Icon"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <p className="text-[24px] text-[#D7E4DD] font-normal leading-[1.33] tracking-tighter">Understand complex concepts easily.</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-7">
                        <div className="bg-[rgba(184,224,203,0.12)] rounded-[20px] p-9 flex flex-col gap-7 h-[250px]">
                            <div className="w-8 h-8">
                                <Image
                                    src="/images/zap-icon.svg"
                                    alt="Zap Icon"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <p className="text-[24px] text-[#D7E4DD] font-normal leading-[1.33] tracking-tighter">Real-time responses powered by LLMs.</p>
                        </div>
                        <div className="bg-[rgba(184,224,203,0.12)] rounded-[20px] p-9 flex flex-col gap-7 h-[250px]">
                            <div className="w-8 h-8">
                                <Image
                                    src="/images/tools-icon.svg"
                                    alt="Tools Icon"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <p className="text-[24px] text-[#D7E4DD] font-normal leading-[1.33] tracking-tighter">Seamless collaboration features.</p>
                        </div>
                        <div className="bg-[rgba(184,224,203,0.12)] rounded-[20px] p-9 flex flex-col gap-7 h-[250px]">
                            <div className="w-8 h-8">
                                <Image
                                    src="/images/customize-icon.svg"
                                    alt="Customize Icon"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <p className="text-[24px] text-[#D7E4DD] font-normal leading-[1.33] tracking-tighter">Customizable to fit your workflow.</p>
                        </div>
                    </div>
                </section>
                
                {/* Feature Blocks */}
                <section className="px-24">
                    {/* Code Generation Feature */}
                    <div className="flex items-center gap-24 py-[50px]">
                        <div className="flex flex-col gap-9 flex-1">
                            <div className="flex flex-col gap-[18px]">
                                <h2 className="text-[48px] font-semibold text-[#D7E4DD] tracking-tighter">Code Generation</h2>
                                <p className="text-[24px] text-[#D7E4DD] font-normal leading-[1.33] tracking-tighter">Instantly generate code for any task.</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-[#1B2821]"></div>
                                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-black to-[rgba(0,84,173,0.16)] border border-[rgba(145,182,162,0.2)] shadow-lg">
                                    <div className="absolute top-6 left-6 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#fff] rounded-full overflow-hidden">
                                            <Image 
                                                src="/images/developer-image.png" 
                                                alt="Developer" 
                                                width={48} 
                                                height={48}
                                            />
                                        </div>
                                        <span className="text-[20px] font-semibold text-[#D7E4DD]">Code Snippet</span>
                                    </div>
                                    <div className="flex flex-row px-6 h-[260px] mb-2 gap-x-8 mt-24">
                                    <div className='w-1/2 flex flex-col flex-1 h-full gap-y-4'>
                                        <div className='w-full flex flex-row h-full bg-[#08361E] rounded-xl'></div>
                                        <div className='w-full flex flex-row h-full bg-[#2D2D2D]/30 rounded-xl'></div>
                                        <div className='w-full flex flex-row h-full bg-[#2D2D2D]/30 rounded-xl'></div>
                                        <div className='w-2/3 flex flex-row h-full bg-[#2D2D2D]/30 rounded-xl'></div>
                                        <div className='w-2/3 flex flex-row h-full bg-[#2D2D2D]/30 rounded-xl'></div>
                                    </div>
                                    <div className='w-1/2 flex flex-col h-full bg-[#2D2D2D]/30 rounded-xl'></div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tool Integrations Feature */}
                    <div className="flex items-center gap-24 py-[50px]">
                        <div className="flex-1">
                            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden">
                                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-black to-[rgba(0,84,173,0.16)] border border-[rgba(145,182,162,0.2)] shadow-lg">
                                    <div className="flex fle-row  justify-end items-center gap-6 absolute top-6 left-6 right-6">
                                        <div className="w-24 h-10 bg-[rgba(215,228,221,0.3)] rounded-full opacity-50"></div>
                                        <div className="w-28 h-10 bg-[rgba(215,228,221,0.3)] rounded-full opacity-50"></div>
                                        <div className="bg-[#14AE5C] px-4 py-2 rounded-[16px] text-center">
                                            <span className="text-[15px] text-[#020302]">VSCode</span>
                                        </div>
                                    </div>
                                    <div className="absolute top-24 left-6 right-6 bottom-6 bg-[rgba(215,228,221,0.3)] opacity-50 rounded-[16px]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-9 flex-1">
                            <div className="flex flex-col gap-[18px]">
                                <h2 className="text-[48px] font-semibold text-[#D7E4DD] tracking-tighter">Tool Integrations</h2>
                                <p className="text-[24px] text-[#D7E4DD] font-normal leading-[1.33] tracking-tighter">Integrate with VSCode, GitHub, and more.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Testimonial Section */}
                <section className="flex flex-col items-center gap-[50px] px-24 py-24">
                    <p className="text-[64px] text-[#D7E4DD] font-normal leading-[1.06] tracking-tighter text-center">
                        CodeMentor AI has transformed the way I code. It's like having a coding partner 24/7.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                            <Image 
                                src="/images/testimonial-avatar.png" 
                                alt="Arlo McGregor" 
                                width={64} 
                                height={64}
                            />
                        </div>
                        <div>
                            <h3 className="text-[17px] font-semibold text-[#D7E4DD] leading-[1.41] tracking-tighter">Arlo McGregor</h3>
                            <p className="text-[17px] text-[rgba(209,235,221,0.62)] leading-[1.41] tracking-tighter">Senior Developer at TechCorp</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="px-24 pt-24 pb-[50px]">
                <div className="flex gap-7">
                    <div className="flex flex-col justify-between flex-1 gap-3">
                        <Link href="/">
                            <div className="flex items-center gap-1">
                                <div className="w-8 h-8">
                                    <Image 
                                        src="/images/logo-icon.svg" 
                                        alt="CodeMentor AI Logo" 
                                        width={32} 
                                        height={32}
                                    />
                                </div>
                                <h2 className="text-[28px] font-bold text-[#60AC84] font-sans leading-none tracking-tighter">CodeMentor AI</h2>
                            </div>
                        </Link>
                        <div className="flex gap-3">
                            <Link href="/">
                                <div className="w-6 h-6">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="rgba(209,235,221,0.62)" />
                                    </svg>
                                </div>
                            </Link>
                            <Link href="/">
                                <div className="w-6 h-6">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="rgba(209,235,221,0.62)" />
                                    </svg>
                                </div>
                            </Link>
                            <Link href="/">
                                <div className="w-6 h-6">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" fill="rgba(209,235,221,0.62)" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="w-[200px] flex flex-col gap-2">
                        <h3 className="text-[15px] font-medium text-[#D7E4DD]">Company</h3>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">About Us</p></Link>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Careers</p></Link>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Press</p></Link>
                    </div>
                    
                    <div className="w-[200px] flex flex-col gap-2">
                        <h3 className="text-[15px] font-medium text-[#D7E4DD]">Resources</h3>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Documentation</p></Link>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Blog</p></Link>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Community</p></Link>
                    </div>
                    
                    <div className="w-[200px] flex flex-col gap-2">
                        <h3 className="text-[15px] font-medium text-[#D7E4DD]">Legal</h3>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Privacy Policy</p></Link>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Terms of Service</p></Link>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Cookie Policy</p></Link>
                    </div>
                    
                    <div className="w-[200px] flex flex-col gap-2">
                        <h3 className="text-[15px] font-medium text-[#D7E4DD]">Contact</h3>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Support</p></Link>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Sales</p></Link>
                        <Link href="/"><p className="text-[15px] font-medium text-[rgba(209,235,221,0.62)]">Partnerships</p></Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;