import { FileStackIcon, MergeIcon, PieChartIcon } from "../SvgIcons"
export default function FeatureSection(){
    return(
        <section className="w-full pt-12 md:pt-24 lg:pt-32  min-h-[90vh]">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl xl:text-[2.8rem] 2xl:text-[3.1rem] text-center">
              Features
            </h2>
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-3 md:gap-16">
              <div className="flex flex-col items-center space-y-4 bg-[#ababab68] dark:bg-[#222222af] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4">
                <FileStackIcon className="h-6 w-6" />
                <h3 className="text-lg font-bold">Customizable</h3>
                <p className="text-muted-foreground">
                  Customize your landing page to match your brand.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-[#ababab68] dark:bg-[#222222af] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4">
                <PieChartIcon className="h-6 w-6" />
                <h3 className="text-lg font-bold">Analytics</h3>
                <p className="text-muted-foreground">
                  Track your page&apos;s performance with our built-in analytics. <br/>* Coming soon, depends how much I can code
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-[#ababab68] dark:bg-[#222222af] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4">
                <MergeIcon className="h-6 w-6" />
                <h3 className="text-lg font-bold">Integration</h3>
                <p className="text-muted-foreground">
                  Easily integrate with your favorite social media platforms.
                </p>
              </div>
            </div>
          </div>
        </section>        
    )
}