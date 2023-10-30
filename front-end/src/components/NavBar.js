export const NavBar = (props) => {
    return (
    <div className="Navbar" style={{width: 1279, height: 110, left: 81, top: 142, position: 'absolute'}}>
        <button className="MealPlanningBox" style={{textAlign: 'center', width: 414, height: 66, left: 865, top: 33.44, position: 'absolute', fontSize: 40, fontFamily: 'Literata', fontWeight: '800', letterSpacing: 8, wordWrap: 'break-word'}}>
          Meal Planning
        </button>
        <button className="RecipesBox" style={{width: 294, height: 66, left: 571, top: 33, position: 'absolute', fontSize: 40, fontFamily: 'Literata', fontWeight: '800', letterSpacing: 8, wordWrap: 'break-word'}}>
          Recipes
        </button>
        <button className="InventoryBox" style={{width: 342, height: 66, left: 229, top: 33, position: 'absolute', fontSize: 40, fontFamily: 'Literata', fontWeight: '800', letterSpacing: 8, wordWrap: 'break-word'}}>
          Inventory
        </button>
        <button className="HomeBox" style={{width: 229, height: 99, left: 0, top: 0, position: 'absolute', fontSize: 40, fontFamily: 'Literata', fontWeight: '800', letterSpacing: 8, wordWrap: 'break-word'}}>
          Home
        </button>
      </div>
    );
}

export default NavBar;