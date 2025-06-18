import { FooterCompany } from './Footer.Company'
import { FooterSocials } from './FooterSocials'
import { Quicklinks } from './Quicklinks'
import { Copyright } from './FooterCopyright'
import { FooterPolicies } from './FooterPolicies'

export const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#F4F2ED] border-t-2 border-black px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-5 gap-8">
                    <FooterCompany />
                    <FooterSocials />
                    <Quicklinks />
                    <FooterPolicies />
                </div>
                <Copyright year={currentYear} />
            </div>
        </footer>
    )
}
