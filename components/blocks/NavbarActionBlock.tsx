import GithubContributionButton from "../examples/GithubContributionButton"
import { ThemeToggleButton } from "../buttons/ThemeToggleButton"

const NavbarActionBlock = ({onDocs}:{onDocs?:boolean}) => {
    return (
        <div className="flex items-center py-0 gap-4 ">
            <GithubContributionButton onSidebar={onDocs} />
            <ThemeToggleButton
                onSidebar={onDocs}
                variant="rectangle"
                start="bottom-up"
            />
        </div>
    )
}

export default NavbarActionBlock
