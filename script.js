// 페이지 로드 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('문서 로드 완료');
    
    // 모바일 메뉴 토글 요소 가져오기
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    
    // 디버깅을 위한 콘솔 로그 추가
    console.log('햄버거 버튼 확인:', mobileMenuBtn);
    console.log('모바일 드롭다운 확인:', mobileDropdown);
    
    if (mobileMenuBtn && mobileDropdown) {
        console.log('모바일 메뉴 요소 찾음 - 정상');
        
        // 초기 상태 설정
        mobileMenuBtn.style.display = 'block';
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('모바일 메뉴 버튼 클릭됨');
            
            // 토글 작동 확인
            mobileDropdown.classList.toggle('show');
            this.classList.toggle('active');
            
            console.log('토글 후 상태:', 
                      '드롭다운 표시:', mobileDropdown.classList.contains('show'), 
                      '버튼 활성화:', this.classList.contains('active'));
            
            // 바디 스크롤 잠금 (메뉴가 열려있을 때)
            if (mobileDropdown.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 모바일 메뉴 항목 클릭
        const mobileMenuLinks = document.querySelectorAll('.mobile-nav-menu a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('모바일 메뉴 항목 클릭됨:', this.getAttribute('href'));
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // 메뉴 닫기
                    mobileDropdown.classList.remove('show');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // 스크롤 이동
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetSection.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }, 300); // 메뉴가 닫힌 후 스크롤
                }
            });
        });
        
        // 데스크톱 메뉴 항목 클릭
        const desktopMenuLinks = document.querySelectorAll('.nav-menu a');
        desktopMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // 문서 클릭 시 메뉴 닫기
        document.addEventListener('click', function(e) {
            if (mobileDropdown.classList.contains('show') && 
                !mobileMenuBtn.contains(e.target) && 
                !mobileDropdown.contains(e.target)) {
                
                console.log('외부 클릭으로 메뉴 닫힘');
                mobileDropdown.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('모바일 메뉴 요소를 찾을 수 없음');
    }
    
    // 스크롤 이벤트 감지
    window.addEventListener('scroll', function() {
        // 헤더 스크롤 효과
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // 요소가 화면에 나타날 때 애니메이션 효과
        revealOnScroll();
    });
    
    // 스크롤 시 요소를 나타나게 하는 함수
    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
                
                // 섹션 내부 요소들에 애니메이션 적용
                const elements = section.querySelectorAll('.partner, .plan, .client-images img, .contact-form');
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100 * index);
                });
            }
        });
    }
    
    // 초기 실행
    revealOnScroll();
    
    // 폼 제출 이벤트
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('폼 제출됨');
            alert('문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.');
            this.reset();
        });
    }
    
    // 애니메이션 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .partner, .plan, .client-images img, .contact-form {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 20px;
                cursor: pointer;
                z-index: 1001;
            }
            
            .mobile-menu-btn span {
                display: block;
                width: 100%;
                height: 3px;
                background-color: #6a1b9a;
                transition: all 0.3s ease;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: translateY(8.5px) rotate(45deg);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: translateY(-8.5px) rotate(-45deg);
            }
            
            nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                height: 100vh;
                background-color: #fff;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                transition: right 0.3s ease;
                z-index: 1000;
                padding: 80px 20px 20px;
            }
            
            nav.active {
                right: 0;
            }
            
            .nav-menu {
                flex-direction: column;
            }
            
            .nav-menu li {
                margin: 15px 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // 이미지 슬라이더 기능
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.dot');
    
    if (slider && slides.length > 0) {
        console.log('슬라이더 요소 찾음, 슬라이드 개수:', slides.length);
        
        let currentSlide = 0;
        
        // 슬라이드 변경 함수
        function showSlide(n) {
            // 현재 활성화된 슬라이드와 닷 비활성화
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            // 새로운 슬라이드 인덱스 계산
            currentSlide = (n + slides.length) % slides.length;
            
            // 새 슬라이드와 닷 활성화
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            console.log('슬라이드 변경:', currentSlide);
        }
        
        // 다음 슬라이드 보기
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // 이전 슬라이드 보기
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // 이벤트 리스너 추가
        if (prevArrow && nextArrow) {
            prevArrow.addEventListener('click', prevSlide);
            nextArrow.addEventListener('click', nextSlide);
        }
        
        // 닷 클릭 이벤트
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                showSlide(slideIndex);
            });
        });
        
        // 자동 슬라이드 (선택적)
        // setInterval(nextSlide, 5000);
    }
}); 