# import self as self
from selenium.webdriver.common.by import By
import time
# 导包
from selenium import webdriver
# 创建浏览器对象
driver = webdriver.Chrome()
# 打开百度首页
driver.get("https://www.baidu.com")
# 在百度文本框中输入selenium
driver.find_element(By.ID,"kw").send_keys(" 一手烂牌打成王炸的巾帼宰相上官婉儿……")
# 点击百度按钮
driver.find_element(By.ID,"su").click()
# driver.find_element(By.XPATH,"xpath=//div[@id='tsn_inner']/div[2]/span".find("百度为您找到相关结果约100,000,000个"))
time.sleep(3)
handles = driver.window_handles     # 获取当前浏览器的所有窗口句柄
driver.switch_to.window(handles[-1])    # 获取最新窗口句柄
driver.find_element(By.XPATH,"//div[@id='content_left']/div/div/div/h3/a").click()
time.sleep(3)
handles = driver.window_handles     # 获取当前浏览器的所有窗口句柄
driver.switch_to.window(handles[-1])
driver.find_element(By.CLASS_NAME,"user-bar-uname").click()
time.sleep(8)
# 关闭浏览器
driver.quit()