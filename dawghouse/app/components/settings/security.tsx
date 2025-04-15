import { SettingsProp } from "../settingsCard";

function Security(props: SettingsProp) {
    return (
        <div className="mr-10 ml-20 mt-10 w-80 h-85 pt-10">
            <h2 className="text-center font-bold">Your trust is important to us.</h2>
            <p className="mt-2 text-center text-md/10"> That's why we've implemented a secure system where all personal data is stored offsite in a resilient cloud environment. This approach not only protects against potential on-site vulnerabilities but also ensures data availability and integrity through redundant systems and advanced security technologies.</p>
        </div>
    )
}

export default Security;