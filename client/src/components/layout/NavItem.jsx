import { NavLink } from "react-router-dom";

const NavItem = ({
    to,
    icon: Icon,
    label,
    collapsed = false,
    onClick
}) => {

    return (

        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `
                group
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                duration-200

                ${isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
                `
            }
        >
            {({ isActive }) => (
                <>
                    {Icon && (
                        <Icon
                            size={20}
                            className={`
                            transition-all
                            ${isActive
                                    ? "text-blue-600"
                                    : "text-slate-500 group-hover:text-slate-800"
                                }
                        `}
                        />

                    )}

                    {!collapsed && (
                        <span className="truncate">
                            {label}
                        </span>
                    )}
                </>
            )}
        </NavLink>

    );

};

export default NavItem;