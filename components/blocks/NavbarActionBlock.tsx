import GithubContributionButton from "../buttons/GithubContributionButton"
import { ThemeToggleButton } from "../buttons/ThemeToggleButton"

const NavbarActionBlock = () => {
    return (
        <div className="flex items-center gap-4">
            <GithubContributionButton />
            <ThemeToggleButton
                variant="rectangle"
                start="bottom-up"
            />
        </div>
    )
}

export default NavbarActionBlock
