import { Link } from "react-router-dom";
import test from "../../assets/test.png"
import "../../styles/IntroductionWebsite.css"
import Footer from "../footer/Footer";
export default function IntroductionWebsite() {
    return (
        <div className="w-full prata-regular bold">
            <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-20 lg:py-24">
                <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center">
                    <img
                        src={test}
                        width={600}
                        height={400}
                        alt="Image"
                        className="object-cover rounded-md mb-6 md:mb-0 md:mr-8"
                    />
                    <div className="md:flex-1">
                        <h2 className="text-2xl font-bold mb-4">유튜브 검색 데이터를 수집하고 관리하는 홈페이지</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            저희 홈페이지는 유튜브에서 관심 있는 토픽에 대한 데이터를 수집하고 관리하는 서비스입니다. 유튜브는 무수히 많은 비디오들이 업로드되는 곳이지만, 이 중에서 관심 있는 비디오를 찾는 것은 쉽지 않을 수 있습니다. 저희 서비스는 이러한 문제를 해결하기 위해 유튜브의 검색 데이터를 수집하고 이를 효율적으로 관리하여 사용자에게 필요한 정보를 제공합니다.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-12 md:py-20 lg:py-24">
                <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-4 mb-6">
                        {/* <BriefcaseIcon className="w-8 h-8 text-primary" /> */}
                        <h3 className="text-xl font-semibold">검색 데이터 수집</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            유튜브의 다양한 토픽에 대한 검색 데이터를 수집하여 데이터베이스에 저장합니다.
                        </p>
                    </div>
                    <div className="space-y-4 mb-6">
                        {/* <RocketIcon className="w-8 h-8 text-primary" /> */}
                        <h3 className="text-xl font-semibold">인기 키워드 추적</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            유튜브에서 현재 가장 인기 있는 키워드를 추적하고 사용자에게 제공합니다.
                        </p>
                    </div>
                    <div className="space-y-4 mb-6 ">
                        {/* <PhoneIcon className="w-8 h-8 text-primary" /> */}
                        <h3 className="text-xl font-semibold ">분석 도구 제공</h3>
                        <p className="text-gray-500 dark:text-gray-400 ">
                            수집된 데이터를 분석하여 트렌드 분석 및 인사이트 도출을 지원합니다.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {/* <PhoneIcon className="w-8 h-8 text-primary" /> */}
                        <h3 className="text-xl font-semibold">인기 키워드 추적</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            유튜브에서 현재 가장 인기 있는 키워드를 추적하고 사용자에게 제공합니다.
                        </p>
                    </div>
                </div>
            </section>
            <main className="py-2 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto space-y-6 mb-6">
                        <div className="text-center space-y-4">
                            <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
                                우리의 홈페이지를 통해 유튜브에서 원하는 정보를 쉽고 효율적으로 찾아보세요. 최신 트렌드를 파악하고 개인 맞춤형 서비스를 경험해보십시오.
                            </p>
                            <div className="grid gap-4 sm:flex sm:justify-center">
                                <Link to="/" className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                                    홈페이지
                                </Link>
                                <Link
                                    to="#"
                                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"

                                >
                                    연락
                                </Link>
                            </div>
                        </div>


                    </div>
                </div>
            </main>
          <Footer></Footer>
        </div>
    )
}