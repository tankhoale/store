<template>
  <div class="navbar-content" :class="{ 'hide-nav': !isActive, 'open-nav': isActive }">
    <i @click="openNav" :class="['arrow', { active: isActive }]" class="arrow fa-solid fa-chevron-right"></i>
    <nav :class="{ 'hide-nav': !isActive, 'open-nav': isActive }">
      <ul>
        <li>
          <router-link to="/" class="logo">
            <img src="../../assets/qtt.png" alt="logo">
            <div class="holder">
              <span class="nav-item">QTT</span>
            </div>
          </router-link>
        </li>
        <li><router-link to="/management-details/navbar">
            <i class="fas fa-solid fa-bars"></i>
            <span class="nav-item">Navbar</span>
          </router-link></li>
        <li><router-link to="/management-details/categories">
            <i class="fas fa-solid fa-layer-group"></i>
            <span class="nav-item">Categories</span>
          </router-link></li>
        <li><router-link to="/management-details/food">
            <i class="fas fa-solid fa-bowl-food"></i>
            <span class="nav-item">Food</span>
          </router-link></li>
        <li><router-link to="/management-details/invoice">
            <i class="fas fa-solid fa-receipt"></i>
            <span class="nav-item">Invoice</span>
          </router-link></li>
          <li><router-link to="/management-details/banners">
            <i class="fas fa-solid fa-image"></i>
            <span class="nav-item">Banner</span>
          </router-link></li>
          <li><router-link to="/management-details/schedulesBe">
            <i class="fas fa-solid fa-calendar-days"></i>
            <span class="nav-item">Schedules</span>
          </router-link></li>
          <li><router-link to="/management-details/date-periods">
            <i class="fas fa-solid fa-calendar-week"></i>
            <span class="nav-item">Date Periods</span>
          </router-link></li>
          <li><router-link to="/management-details/fingerprints">
            <i class="fas fa-solid fa-fingerprint"></i>
            <span class="nav-item">Fingerprint</span>
          </router-link></li>
          <li><router-link to="/management-details/attendance-tracking">
            <i class="fas fa-solid fa-regular fa-clock"></i>
            <span class="nav-item">Attendance Tracking</span>
          </router-link></li>
          <li><router-link to="/management-details/employees">
            <i class="fas fa-solid fa-user-tie"></i>
            <span class="nav-item">Employees</span>
          </router-link></li>
          <li><router-link to="/management-details/users">
            <i class="fas fa-solid fa-user"></i>
            <span class="nav-item">Users</span>
          </router-link></li>
          <li><router-link to="/management-details/roles">
            <i class="fas fa-solid fa-user-tag"></i>
            <span class="nav-item">Roles</span>
          </router-link></li>
          <!-- <i class="fa-solid fa-user-tie"></i> -->
        <!-- <li><router-link to="/management-details/news">
            <i class="fas fa-solid fa-newspaper"></i>
            <span class="nav-item">News</span>
          </router-link></li> -->

        <li class="logout"><router-link to="/login">
            <i class="fas fa-solid fa-arrow-right-from-bracket"></i>
            <span class="nav-item">Log out</span>
          </router-link></li>
      </ul>
    </nav>
  </div>

</template>
<script>
export default {
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    openNav () {
      this.isActive = !this.isActive
    }
  }
}
</script>
<style scoped>
  .navbar-content {
    position: relative;
    min-height: 100vh;
  }

  nav {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    background: #006885;
    overflow: hidden;
    box-shadow: 0 20px 35px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }

  .logo {
    text-align: center;
    display: flex;
    margin: 10px 0 0 13px;
  }

  .logo div {
    position: relative;
  }

  .logo img {
    margin-left: 4px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .logo span {
    position: absolute;
    font-weight: bold;
    padding-left: 12px;
    font-size: 18px;
    text-transform: uppercase;
    top: 7px;
  }

  .logo:hover {
    background: none;
  }

  li {
    padding: 5px;
  }

  a {
    position: relative;
    color: #fff;
    font-size: 14px;
    display: table;
    text-decoration: none;
    border-radius: 12px;
  }

.fas {
  position: relative;
  width: 70px;
  height: 40px;
  top: 11px;
  font-size: 20px;
  text-align: center;
}

.nav-item {
  position: relative;
  top: 9px;
  margin-left: 10px;
}

  a:hover {
    background: rgba(207, 149, 49, 0.7);
  }

  .logout {
    position: absolute;
    bottom: 0;
  }

  .arrow {
    position: absolute;
    width: 22px;
    height: 22px;
    line-height: 22px;
    right: -12px;
    font-size: 12px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
    text-align: center;
    font-weight: bold;
    top: 27px;
    border-radius: 50px;
    color: #006885;
    transition: all 0.3s ease;
    z-index: 3;
    cursor: pointer;
    caret-color: transparent;
  }

  .arrow.active {
    transform: rotate(180deg);
  }

  .hide-nav {
    transition: all 0.3s ease;
    width: 80px;
  }

  .hide-nav ul li a span{
    display: none;
  }

  .open-nav {
    transition: all 0.3s ease;
    width: 280px;
  }

  .open-nav ul li a span{
    display: initial;
  }

  .open-nav ul li a{
    width: 270px;
  }

  nav a.router-link-exact-active {
    background: rgba(207, 149, 49, 0.9);
  }
</style>
