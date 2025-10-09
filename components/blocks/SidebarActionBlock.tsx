import GithubContributionButton from "../buttons/GithubContributionButton"
import { ThemeToggleButton } from "../buttons/ThemeToggleButton"

const SidebarActionBlock = () => {
    return (
        <div className="flex items-center gap-4 justify-end ">
            <GithubContributionButton onSidebar />
            <ThemeToggleButton
                onSidebar
                variant="rectangle"
                start="bottom-up"
            />
        </div>
    )
}

export default SidebarActionBlock
